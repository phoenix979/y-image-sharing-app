import path from 'path';
import fs from 'fs';
import { getExpiredImages, deleteImage } from '../repositories/imageRepository';
import dotenv from 'dotenv';

dotenv.config();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';

export const cleanupExpiredImages = async (): Promise<void> => {
  const now = Date.now();
  const expiredImages = await getExpiredImages(now);
  expiredImages.forEach((image) => {
    const filePath = path.join(uploadDir, image.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      } else {
        console.log(`Deleted expired file: ${filePath}`);
      }
    });
    deleteImage(image.id).catch((err) => {
      console.error(`Error deleting image record ${image.id}:`, err);
    });
  });
};
