import { Router } from 'express';
import { CreateItemController } from '../../../modules/items/useCases/create-item-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const itemsRouter = Router();

const createItemController = new CreateItemController();

itemsRouter.post('/add', ensureAuthenticate, createItemController.handle);

export { itemsRouter };
