import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({ message: "Logged out successfully" });

        response.cookies.set({
            name: 'token',
            value: '',
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 0,
            sameSite: 'strict',
            path: '/',
        });

        response.cookies.set({
            name: 'clientToken',
            value: '',
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 0,
            sameSite: 'strict',
            path: '/',
        });

        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ error: "Something went wrong during logout" }, { status: 500 });
    }
}