import { Router } from 'express';
import { CreateCategoryController } from '../controllers/categories/CreateCategoryController';
import { ListAllCategoriesContreller } from '../controllers/categories/ListAllCategoriesContreller';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listAllCategoriesContreller = new ListAllCategoriesContreller();

categoriesRouter.post(
  '/create',
  ensureAutenticated,
  createCategoryController.handle,
);

categoriesRouter.get(
  '/list',
  ensureAutenticated,
  listAllCategoriesContreller.handle,
);

export { categoriesRouter };
