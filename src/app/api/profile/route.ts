import mongoose from 'mongoose';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {User} from '@/app/models/User';

export async function PUT(req: Request) {
    mongoose.connect(process.env.MONGO_URL!);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if ('name' in data) {
        // const user = await User.findOne({email});
        // user.name = data.name;
        // await user.save();
        await User.updateOne({email}, {name: data.name});

    }
    return Response.json(true);
}
