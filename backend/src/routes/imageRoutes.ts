import { Router } from 'express';
import { uploadImage, getImage } from '../controllers/imageController';
import { upload } from '../utils/fileStorage';

const router = Router();

router.post('/', upload.single('image'), uploadImage);
router.get('/:imageID', getImage);

export default router;
