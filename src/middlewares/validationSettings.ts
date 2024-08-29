import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Define el esquema de validación para los datos de configuración
const settingsSchema = Joi.object({
  deliveryMethods: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        enum: Joi.string().required(),
        order: Joi.number().required(),
        isDefault: Joi.boolean().required(),
        selected: Joi.boolean().required(),
      }),
    )
    .required(),
  fulfillmentFormat: Joi.object({
    rfid: Joi.boolean().required(),
    print: Joi.boolean().required(),
  }).required(),
  printer: Joi.object({
    id: Joi.string().allow(null),
  }).required(),
  printingFormat: Joi.object({
    formatA: Joi.boolean().required(),
    formatB: Joi.boolean().required(),
  }).required(),
  scanning: Joi.object({
    scanManually: Joi.boolean().required(),
    scanWhenComplete: Joi.boolean().required(),
  }).required(),
  paymentMethods: Joi.object({
    cash: Joi.boolean().required(),
    creditCard: Joi.boolean().required(),
    comp: Joi.boolean().required(),
  }).required(),
  ticketDisplay: Joi.object({
    leftInAllotment: Joi.boolean().required(),
    soldOut: Joi.boolean().required(),
  }).required(),
  customerInfo: Joi.object({
    active: Joi.boolean().required(),
    basicInfo: Joi.boolean().required(),
    addressInfo: Joi.boolean().required(),
  }).required(),
}).options({ stripUnknown: true });

export const validateSettings = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.clientId) {
    return res.status(400).json({ error: '`clientId` should not be included in the request body' });
  }

  const { error } = settingsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};
