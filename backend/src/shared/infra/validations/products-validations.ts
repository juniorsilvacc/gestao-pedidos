import { celebrate, Segments, Joi } from 'celebrate';

export const createProductValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    category_id: Joi.string().required().uuid(),
  },
});

export const updateProductValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
    category_id: Joi.string().uuid(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().required().uuid(),
  },
});

export const removeProductValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required().uuid(),
  },
});
