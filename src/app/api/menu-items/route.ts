import {MenuItem} from '@/app/models/MenuItem';
import mongoose from 'mongoose';

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const body = await req.json();
    const menuItemDoc = await MenuItem.create(body);
    return Response.json(menuItemDoc);

}
