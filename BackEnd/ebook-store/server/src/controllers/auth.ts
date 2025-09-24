import { Request, Response, RequestHandler } from "express";
import crypto from "crypto";
import VerificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer";
import mail from "@/utils/mail";
import { formatUserProfile, sendErrorResponse } from "@/utils/helper";
import jwt from 'jsonwebtoken';

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
    const link = `${process.env.VERIFICATION_LINK}?token=${randomToken}&userId=${userId}`;

    user.name = "";
    await mail.sendVerificationMail({
      link,
      to: user.name,
    });
    res.json({ message: "Please check your email for link." });
};

export const verifyAuthToken: RequestHandler =async (req,res) =>{
  const {token, userId} = req.query

  if(typeof token !== 'string' || typeof userId !== 'string' ){
    return sendErrorResponse({
      status: 403,
      message: 'Invalid request!',
      res
    })
  }
  const verificationToken = await VerificationTokenModel.findOne({userId})
  if(!verificationToken || !verificationToken.compare(token)){
    return sendErrorResponse({
      status: 403,
      message: 'Invalid request, token mismatch!',
      res
    })
  }
  const user = await UserModel.findById(userId)
  if(!user){
return sendErrorResponse({
      status: 500,
      message: 'Something went wrong, user not found!',
      res
    })
  }

  await VerificationTokenModel.findByIdAndDelete(verificationToken._id)

  //TODO: authentication
  const payload = {userId: user._id}
  const authToken = jwt.sign(payload, process.env.JWT_SECRET!,{
    expiresIn: '15d'
  }) 

  res.cookie('authToken', authToken, {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    expires: new Date(Date.now()+15*24*60*60*1000)
  })
  res.json({ 
    message: "Authentication successful!",
    token: authToken 
  })
  // res.redirect(
  //   `${process.env.AUTH_SUCCESS_URL}?profile=${JSON.stringify(
  //     formatUserProfile(user)
  //   )}`
  // );
  res.send();
}

export const sendProfileInfo: RequestHandler = (req,res) => {
  res.json({
    profile: req.user,
  })
}

export const logout: RequestHandler = (req,res) => {
  res.clearCookie('authToken').send();
}