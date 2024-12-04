import { NextResponse } from "next/server";
import { Blog } from "@/lib/database/model/post";
import connectToDatabase from "@/lib/database/db_connection";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const { title, description, category, image, userId } = await req.json();

        console.log("Received Data:", { title, description, category, image, userId });

        if (!title || !description || !category || !image || !userId) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }
        const newPost = {
            title,
            description,
            category,
            image,
            userId,
        }
        const PostData = await new Blog(newPost)
        const response = await PostData.save()

        return NextResponse.json({ success: true, result: response });
    } catch (error) {
        console.error("Error saving post:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save post" },
            { status: 500 }
        );
    }
}
