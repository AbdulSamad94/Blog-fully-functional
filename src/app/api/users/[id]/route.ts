import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/database/db_connection";
import { User } from "@/lib/database/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

export const PUT = async (req: Request, { params }: RouteParams) => {
    const { id } = await params;

    try {
        await connectToDatabase();

        // Verify session and permissions
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is updating their own profile
        if (session.user.id !== id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Get update data from request body
        const updateData = await req.json();

        // Validate required fields
        if (updateData.name !== undefined && updateData.name.trim() === '') {
            return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
        }

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: updateData
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};