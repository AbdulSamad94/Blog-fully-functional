import { NextResponse } from 'next/server';
import nodemailer from "nodemailer"

export async function POST(request: Request) {
    const { name, email, message } = await request.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Environment variables EMAIL_USER or EMAIL_PASS are not set.");
        return NextResponse.json({ message: "Server error: Missing email configuration" }, { status: 500 });
    }

    try {
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify SMTP connection configuration
        await transporter.verify();
        console.log("SMTP connection verified successfully");

        // Send email
        const info = await transporter.sendMail({
            from: `"Blog Website" <${process.env.EMAIL_USER}>`, // Must match authenticated user
            to: "abdulsamadsiddiqui2000@gmail.com", // Your email to receive messages
            subject: "New message from your Blog website",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        });

        console.log("Email sent successfully:", info.messageId);
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Error sending email", error: error.message }, { status: 500 });
    }
}
