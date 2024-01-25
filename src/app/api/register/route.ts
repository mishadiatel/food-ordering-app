import mongoose from 'mongoose';
import {User} from '@/app/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL!);
    const pass = body.password;
    body.password = await bcrypt.hash(pass, 12);
    const createdUser = await User.create(body);
    console.log(createdUser);
    return Response.json(createdUser);
}
