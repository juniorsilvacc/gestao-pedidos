import { Router } from 'express';
import { CloseOrderController } from '../controllers/orders/CloseOrderController';
import { CreateOrderController } from '../controllers/orders/CreateOrderController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();

ordersRoutes.post('/create', ensureAutenticated, createOrderController.handle);

ordersRoutes.delete(
  '/close/:id',
  ensureAutenticated,
  closeOrderController.handle,
);

export { ordersRoutes };
