// app/api/update-users/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/lib/database/model/User';
import connectToDatabase from '@/lib/database/db_connection';


export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const result = await User.updateMany(
            {},
            { $set: { followers: 0 } }
        );

        console.log(`${result.modifiedCount} users updated successfully!`);

        return NextResponse.json({ message: `${result.matchedCount} Users updated successfully` });
    } catch (error) {
        console.error('Error updating users:', error);
        return NextResponse.json({ error: 'Failed to update users' }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}
