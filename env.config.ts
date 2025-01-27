import * as Joi from 'joi';

export const envSchema = Joi
  .object({
    NODE_ENV: Joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().integer().min(0).max(65535).required(),

   //Nats configuration
    NATS_URL:Joi.string().required(),

  })
  .unknown(true);