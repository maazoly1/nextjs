import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 500 })
        }
        user.verifyToken = ''
        user.verifyTokenExpiry = ''
        user.isVerified = true
        await user.save();

        return NextResponse.json({ message: "Email Verified Successfully" })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}