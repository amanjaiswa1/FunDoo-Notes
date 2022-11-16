import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
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
        UserID: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', userSchema);