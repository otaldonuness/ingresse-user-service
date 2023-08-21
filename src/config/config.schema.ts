import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_URI: Joi.string().required().messages({
    'any.required': 'MONGO_URI is required',
    'string.base': 'MONGO_URI must be a string',
  }),
  MONGO_DB: Joi.string().required().messages({
    'any.required': 'MONGO_DB is required',
    'string.base': 'MONGO_DB must be a string',
  }),
  MONGO_USER: Joi.string().required().messages({
    'any.required': 'MONGO_USER is required',
    'string.base': 'MONGO_USER must be a string',
  }),
  MONGO_PASS: Joi.string().required().messages({
    'any.required': 'MONGO_PASS is required',
    'string.base': 'MONGO_PASS must be a string',
  }),
  RABBITMQ_URI: Joi.string().required().messages({
    'any.required': 'RABBITMQ_URI is required',
    'string.base': 'RABBITMQ_URI must be a string',
  }),
  // ... other environment variables
});
