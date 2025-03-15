import { cleanupExpiredImages } from "../services/imageService";
import { getExpiredImages, deleteImage } from "../repositories/imageRepository";
import fs from "fs";
import path from "path";

jest.mock("../repositories/imageRepository", () => ({
  getExpiredImages: jest.fn(),
  deleteImage: jest.fn()
}));

jest.mock("fs", () => ({
  unlink: jest.fn((filePath, callback) => callback(null))
}));

describe("cleanupExpiredImages", () => {
  const mockGetExpiredImages = getExpiredImages as jest.Mock;
  const mockDeleteImage = deleteImage as jest.Mock;
  const mockFsUnlink = fs.unlink as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete expired images", async () => {
    const expiredImages = [
      { id: "1", filename: "image1.png", expiration: Date.now() - 1000, created_at: new Date() },
      { id: "2", filename: "image2.png", expiration: Date.now() - 2000, created_at: new Date() }
    ];
    mockGetExpiredImages.mockResolvedValue(expiredImages);
    mockDeleteImage.mockResolvedValue(undefined);

    await cleanupExpiredImages();

    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    expect(mockFsUnlink).toHaveBeenCalledTimes(expiredImages.length);
    expiredImages.forEach((image) => {
      const expectedPath = path.join(uploadDir, image.filename);
      expect(mockFsUnlink).toHaveBeenCalledWith(expectedPath, expect.any(Function));
    });

    expect(mockDeleteImage).toHaveBeenCalledTimes(expiredImages.length);
    expect(mockDeleteImage).toHaveBeenCalledWith("1");
    expect(mockDeleteImage).toHaveBeenCalledWith("2");
  });

  it("should handle errors in fs.unlink gracefully", async () => {
    const expiredImages = [
      { id: "1", filename: "image1.png", expiration: Date.now() - 1000, created_at: new Date() }
    ];
    mockGetExpiredImages.mockResolvedValue(expiredImages);
    mockDeleteImage.mockResolvedValue(undefined);
    mockFsUnlink.mockImplementation((filePath, callback) => callback(new Error("File not found")));

    await cleanupExpiredImages();

    expect(mockFsUnlink).toHaveBeenCalledTimes(expiredImages.length);
    expect(mockDeleteImage).toHaveBeenCalledTimes(expiredImages.length);
  });

  it("should not attempt to delete if no expired images are returned", async () => {
    mockGetExpiredImages.mockResolvedValue([]);

    await cleanupExpiredImages();

    expect(mockFsUnlink).not.toHaveBeenCalled();
    expect(mockDeleteImage).not.toHaveBeenCalled();
  });
});
