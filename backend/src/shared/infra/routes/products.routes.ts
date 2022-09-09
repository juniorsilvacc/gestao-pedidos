import { Router } from 'express';
import multer from 'multer';
import { CreateProductController } from '../../../modules/products/useCases/CreateProduct/create-product-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import uploadConfig from '../../../config/upload';

const productsRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const createProductsController = new CreateProductController();

productsRouter.post(
  '/create',
  ensureAuthenticate,
  ensureAdmin,
  upload.single('image'),
  createProductsController.handle,
);

export { productsRouter };
