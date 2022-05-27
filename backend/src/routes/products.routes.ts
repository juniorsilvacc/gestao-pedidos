import { Router } from 'express';
import multer from 'multer';
import { CreateProductController } from '../controllers/products/CreateProductController';
import ensureAutenticated from '../middlewares/ensureAutenticated';
import uploadConfig from '../config/upload';

const productsRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const createProductController = new CreateProductController();

productsRouter.post(
  '/create',
  ensureAutenticated,
  upload.single('image'),
  createProductController.handle,
);

export { productsRouter };
