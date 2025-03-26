import mongoose, { Model } from "mongoose";
import { categorySchema } from "./schema/categorySchema"; 
import { ICategory } from "../types";

interface categoryModel extends Model<ICategory>{

     getCategories:Promise<ICategory>;
     getCategory:Promise<ICategory>;

     createCategory(name:string):Promise<ICategory>;
     updateCategory(_id:string,name:string,description:string):Promise<ICategory>;
     delete(_id:string):Promise<String>
}

class Category{
    static async getCategory(this:categoryModel,_id:string){
        const category = await this.findOne({_id});

        if (!category){
            throw new Error("category not found")
        }
        return category;
    }

    static async getCategories(this:categoryModel,_id:string){
        const categories = await this.find({_id});

        if (!categories){
            throw new Error("categories not found")
        }
        return categories;
    }

    static async createCat(this:categoryModel,name:string){
        const createCategory= await this.create({
            name
        })
        return createCategory;
    }


}
categorySchema.loadClass(Category);

export const Categories:categoryModel=mongoose.model<ICategory, categoryModel>(
    "Category",
    categorySchema
);
