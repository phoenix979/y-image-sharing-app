import { AppDataSource } from "../data-source";
import { Image } from "../entity/Image";

const imageRepository = AppDataSource.getRepository(Image);

export const createImage = async (image: Image): Promise<void> => {
  await imageRepository.save(image);
};

export const getImageById = async (id: string): Promise<Image | null> => {
  return await imageRepository.findOneBy({ id });
};

export const deleteImage = async (id: string): Promise<void> => {
  await imageRepository.delete({ id });
};

export const getExpiredImages = async (currentTime: number): Promise<Image[]> => {
  return await imageRepository
    .createQueryBuilder("image")
    .where("image.expiration <= :currentTime", { currentTime })
    .getMany();
};
