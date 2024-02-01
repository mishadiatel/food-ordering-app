import mongoose, {model, models, Schema} from 'mongoose';

interface MenuItemDocument extends Document {
    image: string;
    name: string;
    description: string;
    basePrice: number;
    category: Schema.Types.ObjectId;
    sizes: { name: string, price: number, _id: Schema.Types.ObjectId }[];
    extraIngredientPrices: { name: string, price: number, _id: Schema.Types.ObjectId }[];
}

const extraPriceSchema = new Schema({
    name: {type: String},
    price: {type: Number}
});

const menuItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId, ref: 'Category'},
    basePrice: {type: Number},
    sizes: {type: [extraPriceSchema]},
    extraIngredientPrices: {type: [extraPriceSchema]}
}, {
    timestamps: true
});

export const MenuItem = models?.MenuItem || model<MenuItemDocument>('MenuItem', menuItemSchema);

