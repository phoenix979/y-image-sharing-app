import "reflect-metadata";
import app from './app';
import dotenv from 'dotenv';
import { cleanupExpiredImages } from './services/imageService';
import { AppDataSource } from './data-source';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    setInterval(() => {
      cleanupExpiredImages().catch((err) => console.error('Error cleaning up images:', err));
    }, 60 * 1000);
  })
  .catch((error) => console.error("Error during Data Source initialization", error));
