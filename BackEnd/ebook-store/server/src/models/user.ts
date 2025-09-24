import { model, ObjectId, Schema } from "mongoose";
import { email, trim } from "zod";

export interface UserDoc{
    _id: ObjectId;
    email: string;
    role: "user" |"author";
    name?: string
}

const userSchema = new Schema<UserDoc>({
    name:{
        type: String,
        trim: true,
    },
    email:{
        type:String,
        trim:true,
        required: true,
        unique:true,
    },
    role:{
        type:String,
        enum:["user", "author"],
        default:"user",
    },
})

const UserModel = model("User",userSchema)

export default UserModel