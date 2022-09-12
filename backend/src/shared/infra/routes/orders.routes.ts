import { Router } from 'express';
import { CreateOrderController } from '../../../modules/orders/useCases/create-order-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();

ordersRouter.post('/create', ensureAuthenticate, createOrderController.handle);

export { ordersRouter };
