import { Router } from 'express';
import { CreateOrderController } from '../controllers/orders/CreateOrderController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();

ordersRoutes.post('/create', ensureAutenticated, createOrderController.handle);

export { ordersRoutes };
