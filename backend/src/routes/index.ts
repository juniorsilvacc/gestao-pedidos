import { Router } from 'express';
import { categoriesRouter } from './categories.routes';
import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/products', productsRouter);

export { router };
