import { Categories, } from "../../model/categoryModel";
export const categoryMutations={
    createCategory:async (
        _parent: undefined,
        args: { name: string; status: string; description: string }
      ) => {

        console.log(1,args)

        const createdCategory = await Categories.createCategory(
          args.name,
          args.status,
          args.description,
        );
        return createdCategory;
      },
      updateCategory: async (
        _parent: undefined,
        args: { name: string; status: string; description: string }
      ) => {
        const updatedCategory = await Categories.findOneAndUpdate(
          { name: args.name },
          {
            $set: args,
          }
        );
        return updatedCategory;
      },
      deleteCategory: async (_parent: null, args: { id: string }) => {
        const deletedCategory = await Categories.findByIdAndDelete({
          _id: args.id,
        });
        return deletedCategory;
      },
    };
    

