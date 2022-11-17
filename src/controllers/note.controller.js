import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

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
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
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
    const data = await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    next(error);
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
    const data = await NoteService.archiveNote(req.params._id);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note updated successfully as archive'
    });
  } catch (error) {
    next(error);
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
    const data = await NoteService.trashNote(req.params._id);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note updated successfully as trash'
    });
  } catch (error) {
    next(error);
  }
};