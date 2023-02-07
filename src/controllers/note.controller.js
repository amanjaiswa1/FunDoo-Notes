import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';
import logger from '../config/logger';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createNote = async (req, res, next) => {
  try {
    const data = await NoteService.createNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
    logger.info('Note created successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'All Notes fetched successfully'
    });
    logger.info('All Notes fetched successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to get note by _id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNoteByID = async (req, res, next) => {
  try {
    const data = await NoteService.getNoteByID(req.params._id, req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note fetched successfully'
    });
    logger.info('Note fetched successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to update note by _id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note updated successfully'
    });
    logger.info('Note updated successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};


/**
 * Controller to delete note by _id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteNote(req.params._id, req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note deleted successfully'
    });
    logger.info('Note deleted successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};


/**
 * Controller to update note as archive
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const archiveNote = async (req, res, next) => {
  try {
    const data = await NoteService.archiveNote(req.params._id, req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note archive status updated successfully'
    });
    logger.info('Note archive status updated successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to update note as trash
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const trashNote = async (req, res, next) => {
  try {
    const data = await NoteService.trashNote(req.params._id, req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note trash status updated successfully'
    });
    logger.info('Note trash status updated successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to update note as Pinned
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const pinNote = async (req, res, next) => {
  try {
    const data = await NoteService.pinNote(req.params._id, req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note pinned status updated successfully'
    });
    logger.info('Note pinned status updated successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to add note collaborator
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addCollaborator = async (req, res, next) => {
  try {
    const data = await NoteService.addCollaborator(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note collaborator added successfully'
    });
    logger.info('Note collaborator added successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};

/**
 * Controller to remove note collaborator
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeCollaborator = async (req, res, next) => {
  try {
    const data = await NoteService.removeCollaborator(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note collaborator removed successfully'
    });
    logger.info('Note collaborator removed successfully');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    logger.error(error);
  }
};