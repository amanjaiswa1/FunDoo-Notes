import Note from '../models/note.model';

//create a new note
export const createNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all notes
export const getAllNotes = async () => {
  const data = await Note.find();
  return data;
};

//get note by _id
export const getNoteByID = async (_id) => {
  const data = await Note.findById(_id);
  return data;
};

//update note by _id
export const updateNote = async (_id, body) => {
  const data = await Note.findOneAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete note by _id
export const deleteNote = async (_id) => {
  const data = await Note.findOneAndDelete(_id);
  return data;
};

//update note as archive
export const archiveNote = async (_id, update) => {
  var update = { isArchive: true };
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    update,
    {
      new: true
    }
  );
  return data;
};

//update note as trash
export const trashNote = async (_id, update) => {
  var update = { isTrash: true };
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    update,
    {
      new: true
    }
  );
  return data;
};