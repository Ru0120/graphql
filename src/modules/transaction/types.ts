import { Document } from "mongoose";
export interface ITransaction extends Document{
    amount:number;
    categoryId:string;
    date:string;
    description:string;
    type:string;
    userId:string;
    

}