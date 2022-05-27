import { Router } from 'express';
import { CreateOrderItemController } from '../controllers/items/CreateOrderItemController';

import { RemoveItemController } from '../controllers/items/RemoveItemController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const itemsRoutes = Router();

const createOrderItemController = new CreateOrderItemController();
const removeItemController = new RemoveItemController();

itemsRoutes.post('/add', ensureAutenticated, createOrderItemController.handle);
itemsRoutes.delete(
  '/remove/:id',
  ensureAutenticated,
  removeItemController.handle,
);

export { itemsRoutes };
