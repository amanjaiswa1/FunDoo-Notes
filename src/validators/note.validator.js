import Joi from '@hapi/joi';

//create new note 
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

//update note
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

//add note collaborator
export const collaboratorValidator = (req, res, next) => {
  const schema = Joi.object({
    Collaborator: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
     req.validatedBody = value;
    next();
  }
};