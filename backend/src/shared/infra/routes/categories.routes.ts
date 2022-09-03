import { Router } from 'express';
import { CreateCategoryController } from '../../../modules/categories/useCases/CreateCategory/create-category-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

categoriesRouter.post(
  '/create',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle,
);

export { categoriesRouter };
