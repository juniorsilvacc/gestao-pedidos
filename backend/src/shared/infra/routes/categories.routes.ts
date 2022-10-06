import { Router } from 'express';
import { CreateCategoryController } from '../../../modules/categories/useCases/CreateCategory/create-category-controller';
import { ListCategoriesController } from '../../../modules/categories/useCases/ListCategories/list-categories-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import ensureAdmin from '../middlewares/ensure-admin';
import { UpdateCategoryController } from '../../../modules/categories/useCases/UpdateCategory/update-category-controller';
import {
  createCategoryValidation,
  updateCategoryValidation,
  removeCategoryValidation,
} from '../validations/categories-validations';
import { RemoveCategoryController } from '../../../modules/categories/useCases/RemoveCategory/remove-category-controller';
import { ShowCategoryController } from '../../../modules/categories/useCases/ShowCategory/show-category-controller';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const removeCategoryController = new RemoveCategoryController();
const showCategoryController = new ShowCategoryController();

categoriesRouter.post(
  '/create',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryValidation,
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
  updateCategoryValidation,
  updateCategoryController.handle,
);

categoriesRouter.delete(
  '/remove/:id',
  ensureAuthenticate,
  ensureAdmin,
  removeCategoryValidation,
  removeCategoryController.handle,
);

categoriesRouter.get(
  '/show/:id',
  ensureAuthenticate,
  ensureAdmin,
  showCategoryController.handle,
);

export { categoriesRouter };
