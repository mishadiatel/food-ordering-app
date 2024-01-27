import {model, models, Schema} from 'mongoose';

interface UserDocument extends Document {
    name?: string;
    image?: string;
    email: string;
    password: string;
    phone?: string;
    streetAddress?: string;
    postalCode?: string;
    country?: string;
    city?: string;
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
    },
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    country: {type: String},
    city: {type: String},
}, {
    timestamps: true
});

export const User = models.User || model<UserDocument>('User', userSchema);
