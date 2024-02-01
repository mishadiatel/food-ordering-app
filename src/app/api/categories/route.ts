import {Category} from '@/app/models/Category';
import mongoose from 'mongoose';

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const {name} = await req.json();
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
}

export async function PUT(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const data = await req.json();
    const {_id, name} = data;
    await Category.updateOne({_id}, {name});
    return Response.json(true);
}

export async function DELETE(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL!);
    const categories = await Category.find();
    return Response.json(categories);
}
