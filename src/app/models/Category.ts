import {model, models, Schema} from 'mongoose';

interface categoryDocument extends Document {
    name: string;
}

const categorySchema = new Schema({
        name: {type: String, required: true}
    },
    {timestamps: true}
);

export const Category = models?.Category || model<categoryDocument>('Category', categorySchema);
