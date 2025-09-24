import { model, ObjectId, Schema } from "mongoose";
import { email, trim } from "zod";

export interface UserDoc{
    _id: ObjectId;
    email: string;
    role: "user" |"author";
    name?: string
    signedUp: boolean;
    avatar?:{url:string; id :string;}
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
    signedUp:{
        type:Boolean,
        default:false
    },
    avatar:{
        type: Object,
        url: String,
        id:String
    }
})

const UserModel = model("User",userSchema)

export default UserModel