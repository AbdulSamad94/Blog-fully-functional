import { NextResponse } from "next/server";
import { Blog } from "@/lib/database/model/post";
import connectToDatabase from "@/lib/database/db_connection";
import { getServerSession } from "next-auth"; // NextAuth session import
import { authOptions } from "@/lib/authOptions"; // Tumhare NextAuth ka config import karo

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions); // User session verify karo
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { title, description, category, image } = await req.json();

        // **Server-side validation** (hacker ko bypass rokne ke liye)
        if (!title || title.length < 30 || title.length > 50) {
            return NextResponse.json(
                { success: false, message: "Title must be 30-50 characters long." },
                { status: 400 }
            );
        }

        if (!description || description.length < 150) {
            return NextResponse.json(
                { success: false, message: "Description must be at least 150 characters long." },
                { status: 400 }
            );
        }

        if (!category || !image) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // **UserId session se lo (Hacker ka fake ID use karna rokne ke liye)**
        const userId = session.user.id;

        const newPost = new Blog({
            title,
            description,
            category,
            image,
            userId, // Secure user ID
        });

        const response = await newPost.save();

        return NextResponse.json({ success: true, result: response });

    } catch (error) {
        console.error("Error saving post:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save post" },
            { status: 500 }
        );
    }
}
