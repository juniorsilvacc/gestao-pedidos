import { Router } from 'express';
import multer from 'multer';
import { CreateProductController } from '../../../modules/products/useCases/CreateProduct/create-product-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import uploadConfig from '../../../config/upload';
import { ListProductsController } from '../../../modules/products/useCases/ListProducts/list-products-controller';
import { UpdateProductController } from '../../../modules/products/useCases/UpdateProduct/update-product-controller';
import { RemoveProductController } from '../../../modules/products/useCases/RemoveProduct/remove-product-controller';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string(),
      category_id: Joi.string().required().uuid(),
    },
  }),

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
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number(),
      description: Joi.string(),
      category_id: Joi.string().uuid(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  updateProductController.handle,
);

productsRouter.delete(
  '/remove/:id',
  ensureAuthenticate,
  ensureAdmin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  removeProductController.handle,
);

export { productsRouter };
