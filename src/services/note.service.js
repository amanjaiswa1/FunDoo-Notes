import { boolean } from '@hapi/joi';
import Note from '../models/note.model';
import User from '../models/user.model'
import { client } from '../config/redis';

//create a new note
export const createNote = async (body) => {
  await client.del('getAllData');
  const data = await Note.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (userID) => {
  const data = await Note.find({ userID: userID });
  await client.set(('getAllData'), JSON.stringify(data));
  if (data.length != 0) {
    return data;
  }
  else {
    throw new Error("No Notes are available with this User ID");
  }
};

//get note by _id
export const getNoteByID = async (_id, userID) => {
  const data = await Note.findOne({ _id: _id, userID: userID });
  if (data != null) {
    return data;
  }
  else {
    throw new Error("Note ID is not available with this User ID");
  }
};

//update note by _id
export const updateNote = async (_id, body) => {
  await client.del('getAllData');
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    body,
    {
      new: true
    }
  );
  if (data != null) {
    return data;
  }
  else {
    throw new Error("Note ID is not available with this User ID");
  }
};

//delete note by _id
export const deleteNote = async (_id, userID) => {
  await client.del('getAllData');
  const data = await Note.findOneAndDelete({ _id: _id, userID: userID });
  if (data != null) {
    return data;
  }
  else {
    throw new Error("Note ID is not available with this User ID");
  }
};

//update note as archive
export const archiveNote = async (_id, userID) => {
  await client.del('getAllData');
  let note = await Note.findOne({ _id: _id, userID: userID });
  let archiveStatus = false;

  if (note.isArchive == true) {
    archiveStatus;
  }
  else {
    archiveStatus = true;
  }

  let update = { isArchive: archiveStatus };
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
export const trashNote = async (_id, userID) => {
  await client.del('getAllData');
  let note = await Note.findById({ _id: _id, userID: userID });
  let trashStatus = false;

  if (note.isTrash == true) {
    trashStatus;
  }
  else {
    trashStatus = true;
  }

  var update = { isTrash: trashStatus };
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

//update note as pinned
export const pinNote = async (_id, userID) => {
  await client.del('getAllData');
  let note = await Note.findById({ _id: _id, userID: userID });
  let pinStatus = false;

  if (note.Pinned == true) {
    pinStatus;
  }
  else {
    pinStatus = true;
  }

  var update = { Pinned: pinStatus };
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

//add collaborator 
export const addCollaborator = async (_id, body) => {
  await client.del('getAllData');
  const emailMatch = await User.findOne({ Email: body.Collaborator });
  if (emailMatch != null) {
    const data = await Note.findOneAndUpdate(
      {
        _id: _id,
        userID: body.userID
      },
      {
        $addToSet: { Collaborator: body.Collaborator }
      },
      {
        new: true
      }
    );
    if (data != null) {
      return data;
    }
    else {
      throw new Error("Note ID is not available with this User ID");
    }
  }
  else {
    throw new Error("Invalid Email");
  }
};

//remove collaborator 
export const removeCollaborator = async (_id, body) => {
  await client.del('getAllData');
  const emailMatch = await Note.findOne({ _id: _id, Collaborator: body.Collaborator });
  if (emailMatch != null) {
    const data = await Note.findOneAndUpdate(
      {
        _id: _id,
        userID: body.userID,
        Collaborator: body.Collaborator
      },
      {
        $pull: { Collaborator: body.Collaborator }
      },
      {
        new: true
      }
    );
    return data;
  }
  else {
    throw new Error("This Email is not available in Collaborator");
  }
};