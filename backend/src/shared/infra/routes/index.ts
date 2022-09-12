import { Router } from 'express';
import { categoriesRouter } from './categories.routes';
import { itemsRouter } from './items.routes';
import { ordersRouter } from './orders.routes';
import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/products', productsRouter);
router.use('/api/orders', ordersRouter);
router.use('/api/items', itemsRouter);

export { router };
