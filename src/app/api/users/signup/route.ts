import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists
    const isUser = await User.findOne({ email })

    if (isUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 400 })
    }

    // create salt
    const salt = await bcryptjs.genSalt(10)
    // hash password
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    await sendEmail({userId: savedUser._id, emailType: "VERIFY", email: savedUser.email}) 
    return NextResponse.json({
      message: "User Submitted Successfully!",
      savedUser
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
