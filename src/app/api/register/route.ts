import mongoose from 'mongoose';
import {User} from '@/app/models/User';

export async function POST(req: Request) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL!);
    const createdUser = await User.create(body);
    console.log(createdUser);
    return Response.json(createdUser);
}
