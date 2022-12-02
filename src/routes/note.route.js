import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteUpdateValidator, noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisGetAll } from '../middlewares/redis.middleware';

const router = express.Router();

//route to create a new note
router.post('', noteValidator, userAuth, noteController.createNote);

//route to get all notes
router.get('', userAuth, redisGetAll, noteController.getAllNotes);

//route to get note by _id
router.get('/:_id', userAuth, noteController.getNoteByID);

//route to update note by _id
router.put('/:_id', noteUpdateValidator, userAuth, noteController.updateNote);

//route to delete note by _id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to update note as archive
router.put('/:_id/isArchive', userAuth, noteController.archiveNote);

//route to update note as trash
router.put('/:_id/isTrash', userAuth, noteController.trashNote);

//route to update note as pinned
router.put('/:_id/Pinned', userAuth, noteController.pinNote);

export default router;