import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        Title: {
            type: String
        },
        Description: {
            type: String
        },
        Color: {
            type: String
        },
        isArchive: {
            type: Boolean,
            default: false
        },
        isTrash: {
            type: Boolean,
            default: false
        },
        Pinned: {
            type: Boolean,
            default: false
        },
        userID: {
            type: String
        },
        Collaborator: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
);

export default model('Note', userSchema);