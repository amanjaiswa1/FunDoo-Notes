import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';

/**
 * Controller to create a new user registration
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registration = async (req, res, next) => {
  try {
    const data = await UserService.registration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
    logger.info('User created successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User login successfully'
    });
    logger.info('User login successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to forgot user password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Reset link sent successfully'
    });
    logger.info('Reset link sent successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to reset user password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Password updated successfully'
    });
    logger.info('Password updated successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};
