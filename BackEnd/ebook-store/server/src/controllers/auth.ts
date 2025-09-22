import { Request, Response, RequestHandler } from "express";
import crypto from "crypto";
import VerificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer";

export const generateAuthLink: RequestHandler = async (req, res) => {
  const { email } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    // if no user found the create new user
    user = await UserModel.create({ email });
  }

  const userId = user._id.toString();

  //if we already have token for this user it will remove that first
  await VerificationTokenModel.findOneAndDelete({ userId });

  const randomToken = crypto.randomBytes(36).toString("hex");

  await VerificationTokenModel.create<{ userId: string }>({
    userId,
    token: randomToken,
  });

  console.log(req.body);
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b7ce526625c121",
      pass: "fcabf879c9442e",
    },
  });
  const link = `http://localhost:8989/verify?token=${randomToken}&userId=${userId}`;

  await transport.sendMail({
    to: user.email,
    from: "verfication@myapp.com",
    subject: "Auth Verification",
    html: `
    <div>
    <p>Please click on <a href="${link}">this link</a> to verify you account.</p>
    </div>
    `,
  });
  res.json({ message: "Please check your email for link." });
};
