import { generateAuthLink } from "@/controllers/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/generate-link", generateAuthLink);

// authRouter.post("/login", (req, res) => {
//   // Handle user login
// });

export default authRouter;
