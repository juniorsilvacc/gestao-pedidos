import { Router } from 'express';
import { CloseOrderController } from '../../../modules/orders/useCases/CloseOrder/close-order-controller';
import { CreateOrderController } from '../../../modules/orders/useCases/CreateOrder/create-order-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();

ordersRouter.post('/create', ensureAuthenticate, createOrderController.handle);

ordersRouter.delete(
  '/close/:id',
  ensureAuthenticate,
  closeOrderController.handle,
);

export { ordersRouter };
