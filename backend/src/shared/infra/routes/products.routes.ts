import { Router } from 'express';
import multer from 'multer';
import { CreateProductController } from '../../../modules/products/useCases/CreateProduct/create-product-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import uploadConfig from '../../../config/upload';
import { ListProductsController } from '../../../modules/products/useCases/ListProducts/list-products-controller';
import { UpdateProductController } from '../../../modules/products/useCases/UpdateProduct/update-product-controller';
import { RemoveProductController } from '../../../modules/products/useCases/RemoveProduct/remove-product-controller';

const productsRouter = Router();

const upload = multer(uploadConfig);

const createProductsController = new CreateProductController();
const listProductsController = new ListProductsController();
const updateProductController = new UpdateProductController();
const removeProductController = new RemoveProductController();

productsRouter.post(
  '/create',
  ensureAuthenticate,
  ensureAdmin,
  upload.single('image'),
  createProductsController.handle,
);

productsRouter.get(
  '/list',
  ensureAuthenticate,
  ensureAdmin,
  listProductsController.handle,
);

productsRouter.patch(
  '/update/:id',
  ensureAuthenticate,
  ensureAdmin,
  updateProductController.handle,
);

productsRouter.delete(
  '/remove/:id',
  ensureAuthenticate,
  ensureAdmin,
  removeProductController.handle,
);

export { productsRouter };
