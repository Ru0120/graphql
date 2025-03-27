import { Categories, } from "../../model/categoryModel";

export const categoryQueriesTypeDefs = `
  getCategories:[Category],
  getCategory(id: String!): String,
`;

export const catagoriesQueries = {
  getCategories: async (_parent: undefined) => {
    return await Categories.find();
  },

  getCategory: async (_parent: null, args: { id: string }) => {
    return await Categories.findById({ _id: args.id });
  },
};