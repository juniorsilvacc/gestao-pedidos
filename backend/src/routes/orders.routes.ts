import { Router } from 'express';
import { CloseOrderController } from '../controllers/orders/CloseOrderController';
import { CreateOrderController } from '../controllers/orders/CreateOrderController';
import { ListAllOrderNotDraftController } from '../controllers/orders/ListAllOrderNotDraftController';
import { SendOrderController } from '../controllers/orders/SendOrderController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();
const sendOrderController = new SendOrderController();
const listAllOrderNotDraftController = new ListAllOrderNotDraftController();

ordersRoutes.post('/create', ensureAutenticated, createOrderController.handle);

ordersRoutes.delete(
  '/close/:id',
  ensureAutenticated,
  closeOrderController.handle,
);

ordersRoutes.put('/send', ensureAutenticated, sendOrderController.handle);

ordersRoutes.get(
  '/list',
  ensureAutenticated,
  listAllOrderNotDraftController.handle,
);

export { ordersRoutes };
