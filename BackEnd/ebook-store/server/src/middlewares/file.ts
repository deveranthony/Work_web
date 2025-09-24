import { RequestHandler } from "express";
import formidable, { File } from "formidable";

declare global {
    namespace Express {
        export interface Request {
            // files : {
            //     [key : string]: File : File[]
            // }
            files: Record<string, File| File[]>
        }
    }
}

export const fileParser : RequestHandler =async (req, res, next) =>{
    const form = formidable()
    const [fields, files] = await form.parse(req)

    if(!req.body) req.body = {}
    if(!req.files) req.files = {}

    console.log("Fields: ", fields)
    console.log("Files: ", files)

    next()
}