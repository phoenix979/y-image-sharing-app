import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createImage, getImageById, deleteImage } from '../repositories/imageRepository';
import dotenv from 'dotenv';

dotenv.config();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    const expiration = req.body.expiration;
    if (!expiration) {
      res.status(400).json({ error: 'Expiration time is required' });
      return;
    }
    const expirationTime = parseInt(expiration, 10);
    if (isNaN(expirationTime) || expirationTime <= 0) {
      res.status(400).json({ error: 'Invalid expiration time' });
      return;
    }

    const filename = req.file.filename;
    const id = path.parse(filename).name;
    const expirationTimestamp = Date.now() + expirationTime * 1000;

    await createImage({
      id,
      filename,
      expiration: expirationTimestamp,
      created_at: new Date(),
    } as any);

    const imageUrl = `${req.protocol}://${req.get('host')}/v1/images/${id}`;
    res.status(201).json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const imageID = req.params.imageID;
    const image = await getImageById(imageID);
    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }
    if (Date.now() > Number(image.expiration)) {
      const filePath = path.join(uploadDir, image.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting expired image file:', err);
        }
      });
      await deleteImage(imageID);
      res.status(404).json({ error: 'Image expired' });
      return;
    }

    const filePath = path.join(uploadDir, image.filename);
    res.sendFile(path.resolve(filePath));
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
