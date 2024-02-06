import mongoose from 'mongoose';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {Order} from '@/app/models/Order';
import {MenuItem} from '@/app/models/MenuItem';

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const {cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    });
    const stripeLineItems = [];

    for (const cartProduct of cartProducts) {

        const productInfo = await MenuItem.findById(cartProduct._id);
        let productPrice = productInfo.basePrice;
        if (cartProduct.size) {
            const size = productInfo.sizes.find((size: any) => size._id.toString() === cartProduct.size._id.toString());
            productPrice += size?.price || 0;
        }
        if (cartProduct.extras.length > 0) {
            for (const cartProductExtraThing of cartProduct.extras) {
                const extraThingInfo = productInfo.extraIngredientPrices.find((extra: any) => extra._id.toString() === cartProductExtraThing._id.toString());
                productPrice += extraThingInfo?.price || 0;
            }
        }

        const productName = cartProduct.name;

        stripeLineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: productName
                },
                unit_amount: productPrice * 100
            },
            quantity: 1
        });
    }


    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'cart?cuccess=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId: orderDoc._id.toString()},
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery free',
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 500,
                        currency: 'USD'
                    }
                }
            }
        ]
    });

    return Response.json(stripeSession.url);

}
