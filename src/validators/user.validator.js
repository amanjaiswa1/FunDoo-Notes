import Joi from '@hapi/joi';

export const registrationValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(3).required(),
    LastName: Joi.string().min(3).required(),
    Email: Joi.string().required(),
    Password: Joi.string().min(8).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};