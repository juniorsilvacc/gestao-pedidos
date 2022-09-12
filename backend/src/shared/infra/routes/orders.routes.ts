import { Router } from 'express';
import { CloseOrderController } from '../../../modules/orders/useCases/CloseOrder/close-order-controller';
import { ConcludeOrdersController } from '../../../modules/orders/useCases/ConcludeOrder/conclude-order-controller';
import { CreateOrderController } from '../../../modules/orders/useCases/CreateOrder/create-order-controller';
import { ListOrdersController } from '../../../modules/orders/useCases/ListOrders/list-orders-controller';
import { SendOrderController } from '../../../modules/orders/useCases/SendOrder/send-order-controller';
import ensureAdmin from '../middlewares/ensure-admin';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();
const listOrdersController = new ListOrdersController();
const sendOrderController = new SendOrderController();
const concludeOrderController = new ConcludeOrdersController();

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

ordersRouter.put('/send', ensureAuthenticate, sendOrderController.handle);

ordersRouter.put('/end', ensureAuthenticate, concludeOrderController.handle);

export { ordersRouter };
