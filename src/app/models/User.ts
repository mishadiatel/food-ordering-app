import {model, models, Schema} from 'mongoose';

export interface UserDocument extends Document {
    name?: string;
    image?: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    name: {type: String},
    image: {type: String},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
});

export const User = models.User || model<UserDocument>('User', userSchema);
