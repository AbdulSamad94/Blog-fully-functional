import connectToDatabase from "@/lib/database/db_connection"
import { Blog } from "@/lib/database/model/post"
import { NextResponse } from "next/server"

export const GET = async () => {
    await connectToDatabase()

    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
        return NextResponse.json(blogs, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ result: false, response: err })
    }
}