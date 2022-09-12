import { Router } from 'express';
import { CloseOrderController } from '../../../modules/orders/useCases/CloseOrder/close-order-controller';
import { CreateOrderController } from '../../../modules/orders/useCases/CreateOrder/create-order-controller';
import { ListOrdersController } from '../../../modules/orders/useCases/ListOrders/list-orders-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();
const listOrdersController = new ListOrdersController();

ordersRouter.post('/create', ensureAuthenticate, createOrderController.handle);

ordersRouter.delete(
  '/close/:id',
  ensureAuthenticate,
  closeOrderController.handle,
);

ordersRouter.get(
  '/list',
  ensureAuthenticate,
  ensureAdmin,
  listOrdersController.handle,
);

export { ordersRouter };
