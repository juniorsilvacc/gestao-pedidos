import { Router } from 'express';
import { CreateItemController } from '../../../modules/items/useCases/CreateItem/create-item-controller';
import { RemoveItemController } from '../../../modules/items/useCases/RemoveItem/remove-item-controller';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const itemsRouter = Router();

const createItemController = new CreateItemController();
const removeItemController = new RemoveItemController();

itemsRouter.post(
  '/add',
  ensureAuthenticate,
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().required(),
      order_id: Joi.string().required().uuid(),
      product_id: Joi.string().required().uuid(),
    },
  }),
  createItemController.handle,
);

itemsRouter.delete(
  '/remove/:id',
  ensureAuthenticate,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  removeItemController.handle,
);

export { itemsRouter };
