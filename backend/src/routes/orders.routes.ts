import { Router } from 'express';
import { CloseOrderController } from '../controllers/orders/CloseOrderController';
import { ConcludeOrderController } from '../controllers/orders/ConcludeOrderController';
import { CreateOrderController } from '../controllers/orders/CreateOrderController';
import { DatailOrderController } from '../controllers/orders/DatailOrderController';
import { ListAllOrderNotDraftController } from '../controllers/orders/ListAllOrderNotDraftController';
import { SendOrderController } from '../controllers/orders/SendOrderController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const closeOrderController = new CloseOrderController();
const sendOrderController = new SendOrderController();
const listAllOrderNotDraftController = new ListAllOrderNotDraftController();
const datailOrderController = new DatailOrderController();
const concludeOrderController = new ConcludeOrderController();

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

ordersRoutes.get('/detail', ensureAutenticated, datailOrderController.handle);

ordersRoutes.put('/end', ensureAutenticated, concludeOrderController.handle);

export { ordersRoutes };
