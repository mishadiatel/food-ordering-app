import mongoose from 'mongoose';
import {User} from '@/app/models/User';

export async function GET(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const users = await User.find();
    return Response.json(users);
}
