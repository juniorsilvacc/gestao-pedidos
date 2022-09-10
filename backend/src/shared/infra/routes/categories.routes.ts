import { Router } from 'express';
import { CreateCategoryController } from '../../../modules/categories/useCases/CreateCategory/create-category-controller';
import { ListCategoriesController } from '../../../modules/categories/useCases/ListCategories/list-categories-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import ensureAdmin from '../middlewares/ensure-admin';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post(
  '/create',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRouter.get(
  '/list',
  ensureAuthenticate,
  ensureAdmin,
  listCategoriesController.handle,
);

export { categoriesRouter };
