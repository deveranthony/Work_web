import {z,ZodRawShape} from "zod";
import { RequestHandler } from "express";

export const emailVaildationSchema = {
  email: z.preprocess(
  (val) => val ?? "",
  z.string()
  .min(1, "Email is missing")
  .refine((val) => z.email()
    .safeParse(val)
    .success, "Email format is invalid")
  ),
};

export const newUserSchema ={
  name: z
  .string()
  .min(3,"Name must be 3 characters long!")
  .trim(),
}

export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
  return (req, res, next) => {
    const schema = z.object(obj);
    const result = schema.safeParse(req.body);
    if(result.success) {
        req.body = result.data;
        next()
    }
    else {
      console.log(JSON.stringify(result, null, 2));
      const errors = result.error.flatten().fieldErrors;
      //const errors1 = z.treeifyError(result.error);
      return res.status(400).json({ errors });
    }
  };
};
