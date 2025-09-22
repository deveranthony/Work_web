import { model, Schema } from "mongoose";
import { email, trim } from "zod";

const userSchema = new Schema({
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