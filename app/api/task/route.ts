import { Task } from "@/lib/models/task";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    await connectDB();

    try {
        const response = await Task.create(data);
        console.log("happen while creating task", response)
        return NextResponse.json(response);
    } catch (error) {
        console.log("Error happen while creating task: ", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};