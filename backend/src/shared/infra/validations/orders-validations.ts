import { celebrate, Segments, Joi } from 'celebrate';

export const createOrderValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    table: Joi.number().required(),
  },
});

export const closeOrderValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required().uuid(),
  },
});

export const sendOrderValidation = celebrate({
  [Segments.BODY]: {
    order_id: Joi.string().required().uuid(),
  },
});

export const endOrderValidation = celebrate({
  [Segments.BODY]: {
    order_id: Joi.string().required().uuid(),
  },
});
