import {model, models, Schema} from 'mongoose';

interface UserInfoDocument extends Document {
    email: string;
    phone?: string;
    streetAddress?: string;
    postalCode?: string;
    country?: string;
    city?: string;
    admin?: boolean;
}

const userInfoSchema = new Schema({
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    country: {type: String},
    city: {type: String},
    admin: {type: Boolean, default: false}
}, {
    timestamps: true
});

export const UserInfo = models?.UserInfo || model<UserInfoDocument>('UserInfo', userInfoSchema);
