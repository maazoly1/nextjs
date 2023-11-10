import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"

export const sendEmail = async ({ userId, emailType, email }: any) => {
    try {
        // create a hashed Token
        const hashedToken = await bcryptjs.hash(String(userId), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4f61c8418659fa",
                pass: "3fb44313c3f4cc"
            }
        });

        const mailOptions = {
            from : 'maazoly1@gmail.com',
            to : email,
            subject : emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password',
            html : `<div style="width: 100%; text-align: center">
                        <span>Click here to</span>
                        <a style="display: inline-block; width: auto; text-align: center; padding: 6px 8px; text-decoration: none; color: black; border-radius: 5px; background-color: rgb(249 115 22)" href=${process.env.DOMAIN}>${emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password'}</a>
                    </div>`,
        }

        const response = await transporter.sendMail(mailOptions)
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}
