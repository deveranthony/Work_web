import { generateAuthLink, logout, sendProfileInfo, updateProfileInfo, verifyAuthToken } from "@/controllers/auth";
import { RequestHandler, Router } from "express";
import { z, ZodRawShape } from "zod";
import { validate,emailVaildationSchema } from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";

const authRouter = Router();

authRouter.post(
  "/generate-link",
  validate(emailVaildationSchema),
  generateAuthLink
);
authRouter.get('/verify', verifyAuthToken)
authRouter.get('/profile',isAuth, sendProfileInfo)
authRouter.post('/logout',isAuth, logout)
authRouter.put('/profile',isAuth, updateProfileInfo)

export default authRouter;
