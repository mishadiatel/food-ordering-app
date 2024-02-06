import {model, models, Schema} from 'mongoose';

interface OrderDocument extends Document {
    userEmail: string;
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    cartProducts: object;
    paid: boolean;
}

const orderSchema = new Schema({
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: {type: Boolean, default: false},
}, {
    timestamps: true
});

export const Order = models?.Order || model<OrderDocument>('Order', orderSchema);
