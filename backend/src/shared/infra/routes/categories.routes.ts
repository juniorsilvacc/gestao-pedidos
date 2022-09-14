import { Router } from 'express';
import { CreateCategoryController } from '../../../modules/categories/useCases/CreateCategory/create-category-controller';
import { ListCategoriesController } from '../../../modules/categories/useCases/ListCategories/list-categories-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import ensureAdmin from '../middlewares/ensure-admin';
import { UpdateCategoryController } from '../../../modules/categories/useCases/UpdateCategory/update-category-controller';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();

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

categoriesRouter.patch(
  '/update/:id',
  ensureAuthenticate,
  ensureAdmin,
  updateCategoryController.handle,
);

export { categoriesRouter };
