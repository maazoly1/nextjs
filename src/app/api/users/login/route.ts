import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: "User does not exist exists!" }, { status: 400 })
    }

    // compare password
    const isValid = await bcryptjs.compare(password, user.password)

    // check if valid or not
    if (!isValid) {
      return NextResponse.json({ message: "Invalid Passowrd!" }, { status: 400 })
    }

    // adding data for token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    // create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

    const response = NextResponse.json({
      message: "Login Successfully!",
      tokenData
    }, { status: 200 })

    response.cookies.set("token", token, {
      httpOnly: true
    })

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
