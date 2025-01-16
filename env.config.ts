import * as Joi from 'joi';

export const envSchema = Joi
  .object({
    NODE_ENV: Joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().integer().min(0).max(65535).required(),
    PRODUCTS_MICROSERVICE_HOST: Joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: Joi.number().integer().min(0).max(65535).required(),
    DATABASE_URL: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  })
  .unknown(true);
  export const CLIENT_NAME = 'MARIA';
