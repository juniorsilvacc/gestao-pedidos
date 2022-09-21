import { celebrate, Segments, Joi } from 'celebrate';

export const createCategoryValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
  },
});

export const updateCategoryValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().required().uuid(),
  },
});
