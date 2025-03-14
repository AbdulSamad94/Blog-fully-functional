import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/database/db_connection";
import { User } from "@/lib/database/model/User";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export const GET = async (req: Request, { params }: RouteParams) => {
    const { id } = await params;

    try {
        await connectToDatabase();

        const user = await User.findById(id);

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