import { Router } from 'express';
import { CreateCategoryController } from '../controllers/categories/CreateCategoryController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const categoriesRouter = Router();

categoriesRouter.post(
  '/create',
  ensureAutenticated,
  new CreateCategoryController().handle,
);

export { categoriesRouter };
