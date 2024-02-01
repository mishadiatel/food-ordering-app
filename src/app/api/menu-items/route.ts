import {MenuItem} from '@/app/models/MenuItem';
import mongoose from 'mongoose';
import {Category} from '@/app/models/Category';

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const body = await req.json();
    const menuItemDoc = await MenuItem.create(body);
    return Response.json(menuItemDoc);

}

export async function PUT(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const menuItems = await MenuItem.find();
    return Response.json(menuItems);
}

export async function DELETE(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});
    return Response.json(true);
}
