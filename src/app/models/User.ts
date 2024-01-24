import {model, models, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (this: UserDocument, el: string): boolean {
                return el.length > 5;
            },
            message: 'Password length should be greater than 5'
        }
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (this: UserDocument, next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

export const User = models.User || model<UserDocument>('User', userSchema);
