import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { username, password } = await req.json();

        const userExist = await User.findOne({ username });
        if (!userExist) {
            return NextResponse.json({ error: "User doesn't exists" });
        };

        const comparePassword = await bcrypt.compare(password, userExist.password);
        if (!comparePassword) {
            return NextResponse.json({ error: "Incorrect password" });
        };

        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: "Missing JWT secret key" });
        }
        const token = jwt.sign({ id: userExist._id, username: userExist.username }, secretKey, { expiresIn: "1h" });

        const response = NextResponse.json({ message: "OK" });

        // Set the `httpOnly` token for secure server-side access
        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/"
        });

        // Set a `clientToken` that is accessible from the client-side
        response.cookies.set({
            name: "clientToken",
            value: token,
            httpOnly: false, // This can be accessed by client-side JavaScript
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/"
        });

        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}