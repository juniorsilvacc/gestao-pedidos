import { Router } from 'express';
import { CreateCategoryController } from '../../../modules/categories/useCases/CreateCategory/create-category-controller';
import { ListCategoriesController } from '../../../modules/categories/useCases/ListCategories/list-categories-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import ensureAdmin from '../middlewares/ensure-admin';
import { RemoveCategoryController } from '../../../modules/categories/useCases/RemoveCategory/remove-category-controller';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const removeCategoriesController = new RemoveCategoryController();

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

categoriesRouter.delete(
  '/remove/:id',
  ensureAuthenticate,
  ensureAdmin,
  removeCategoriesController.handle,
);

export { categoriesRouter };
