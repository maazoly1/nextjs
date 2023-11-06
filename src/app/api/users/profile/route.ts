import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        const userId =  await getDataFromToken(request);
        const profileData = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({ data : profileData })       
    } catch (error:any) {
        return NextResponse.json({ message : error.message }, {status: 400})
    }
}
