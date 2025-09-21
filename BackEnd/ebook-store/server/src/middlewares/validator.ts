import {z,ZodRawShape,treeifyError} from "zod";
import { RequestHandler } from "express";

export const emailVaildationSchema = {
  // email: z
  // .string({
  //     required_error: "Email is missing"
  // })
  // .email("Zod says it is invalid")
  // Coerce undefined/null to empty string so we can provide a custom "missing" message
  email: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Email is missing").email("Zod says it is invalid")
  ),
};

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
