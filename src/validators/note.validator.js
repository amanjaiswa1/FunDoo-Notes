import Joi from '@hapi/joi';

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Color: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const noteUpdateValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(2),
    Description: Joi.string().min(2),
    Color: Joi.string().min(2).optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};