import mongoose from "mongoose";
import{nanoid} from "nanoid";
const schema=mongoose.Schema;
export const categorySchema= new schema(
    {
        _id:{
            type:String,
            default:nanoid(),
            unique: true
        },
        name:{
            type:String,
            required:true,
            trim:true

        },
        status:{
            type:String,
            required:true,
            enum:["active","inactive"]
        },
        descriptoin:{
            type:String,
            
        },

    },
    {timestamps:true}
);