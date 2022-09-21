import { celebrate, Joi, Segments } from 'celebrate';

export const createItemValidation = celebrate({
  [Segments.BODY]: {
    amount: Joi.number().required(),
    order_id: Joi.string().required().uuid(),
    product_id: Joi.string().required().uuid(),
  },
});

export const removeItemValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required().uuid(),
  },
});
