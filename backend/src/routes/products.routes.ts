import { Router } from 'express';
import multer from 'multer';
import { CreateProductController } from '../controllers/products/CreateProductController';
import ensureAutenticated from '../middlewares/ensureAutenticated';
import uploadConfig from '../config/upload';
import { ListProductsCategory } from '../controllers/products/ListProductsCategory';

const productsRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const createProductController = new CreateProductController();
const listProductsController = new ListProductsCategory();

productsRouter.post(
  '/create',
  ensureAutenticated,
  upload.single('image'),
  createProductController.handle,
);

productsRouter.get(
  '/category/:id',
  ensureAutenticated,
  listProductsController.handle,
);

export { productsRouter };
