import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    await connectDB();

    try {
        const { username, password } = await req.json();
    
        const userExist = await User.findOne({ username });
        if (userExist) {
            return NextResponse.json({ error: "User already exists" });
        };
    
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashPassword });
        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}