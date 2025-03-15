import express from 'express';
import imageRoutes from './routes/imageRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/v1/images', imageRoutes);
app.use(errorHandler);

export default app;
