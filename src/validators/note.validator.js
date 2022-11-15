import Joi from '@hapi/joi';

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Color: Joi.string().optional(),
    isArchived: Joi.string().optional(),
    isDeleted: Joi.string().optional(),
    UserID: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};