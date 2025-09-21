import { generateAuthLink } from "@/controllers/auth";
import { RequestHandler, Router } from "express";
import { z, ZodRawShape } from "zod";
import { validate,emailVaildationSchema } from "@/middlewares/validator";

const authRouter = Router();

authRouter.post(
  "/generate-link",
  validate(emailVaildationSchema),
  generateAuthLink
);

export default authRouter;
