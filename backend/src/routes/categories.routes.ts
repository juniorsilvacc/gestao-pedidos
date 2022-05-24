import { Router } from 'express';
import { CreateCategoryController } from '../controllers/categories/CreateCategoryController';
import { ListAllCategoriesContreller } from '../controllers/categories/ListAllCategoriesContreller';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const categoriesRouter = Router();

categoriesRouter.post(
  '/create',
  ensureAutenticated,
  new CreateCategoryController().handle,
);

categoriesRouter.get(
  '/list',
  ensureAutenticated,
  new ListAllCategoriesContreller().handle,
);

export { categoriesRouter };
