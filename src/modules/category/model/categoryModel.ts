import mongoose, { Model } from "mongoose";
import { categorySchema } from "./schema/categorySchema"; 
import { ICategory } from "../types";

interface categoryModel extends Model<ICategory>{

     getCategories():Promise<ICategory>;
     getCategory:Promise<ICategory>;

     createCategory(
        name:string,
        status:string,
        decsription:string
    ):Promise<ICategory>;
     
     updateCategory(
        _id:string,
        name:string,
        description:string
    ):Promise<ICategory>;
     
     delete(
        _id:string
    ):Promise<String>
}

export class Category{
    static async getCategory(this:categoryModel,_id:string){
        const category = await this.findOne({_id});

        if (!category){
            throw new Error("category not found")
        }
        return category;
    }

    static async getCategories(this:categoryModel){
        const categories = await this.find({});

        if (!categories){
            throw new Error("categories not found")
        }
        return categories;
    }

    static async createCategory(
        this: categoryModel,
        name: string, status: string, description: string
      ): Promise<ICategory> {
   

       
    
        const category = await this.create({
            name,
            status,
            description,
          });

        console.log(3, category)

        return category;
      }
    }



categorySchema.loadClass(Category);

export const Categories:categoryModel=mongoose.model
<ICategory, 
categoryModel>
(
    "Category",
    categorySchema
);
