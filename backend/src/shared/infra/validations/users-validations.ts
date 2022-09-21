import { celebrate, Segments, Joi } from 'celebrate';

export const authenticationValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(32),
  },
});

export const registerValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required().min(12),
    password: Joi.string().required().min(6).max(32),
  },
});
