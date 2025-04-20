import { NextResponse } from "next/server";
import { User } from "@/lib/database/model/User";
import connectToDatabase from "@/lib/database/db_connection";

export const GET = async (req: Request) => {
    try {
        await connectToDatabase();

        const user = await User.find();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};