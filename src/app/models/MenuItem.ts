import {model, models, Schema} from 'mongoose';

interface MenuItemDocument extends Document {
    image: string;
    name: string;
    description: string;
    basePrice: number;
}

const menuItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    basePrice: {type: Number}
}, {
    timestamps: true
});

export const MenuItem = models?.MenuItem || model<MenuItemDocument>('MenuItem', menuItemSchema);

