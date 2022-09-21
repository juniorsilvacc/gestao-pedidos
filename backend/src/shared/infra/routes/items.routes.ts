import { Router } from 'express';
import { CreateItemController } from '../../../modules/items/useCases/CreateItem/create-item-controller';
import { RemoveItemController } from '../../../modules/items/useCases/RemoveItem/remove-item-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import {
  createItemValidation,
  removeItemValidation,
} from '../validations/items-validations';

const itemsRouter = Router();

const createItemController = new CreateItemController();
const removeItemController = new RemoveItemController();

itemsRouter.post(
  '/add',
  ensureAuthenticate,
  createItemValidation,
  createItemController.handle,
);

itemsRouter.delete(
  '/remove/:id',
  ensureAuthenticate,
  removeItemValidation,
  removeItemController.handle,
);

export { itemsRouter };
