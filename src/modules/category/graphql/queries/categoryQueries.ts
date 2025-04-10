import { Transactions } from "../../../transaction/model/transModel";
import { Categories,  } from "../../model/categoryModel";
import { ICategory } from "../../types";

 const categoryQueriesTypeDefs = `
  getCategories:[Category],
  getCategory(id: ID!): String,
`;

export const catagoriesQueries = {
  getCategories: async (_parent: undefined) => {
    return await Categories.find();
  },

  getCategory: async (_parent: undefined, args: { id: string }) => {
    return await Categories.findById({ _id: args.id });
  },
};

export const categoryResolver = {
    transactions: async (_parent: ICategory) => {

       return await Transactions.find({categoryId: _parent._id})
    },

    transactionsTotalAmount: async (_parent: ICategory) => {
        
        const transactions = await Transactions.find({categoryId: _parent._id})

        let totalAmount: number = 0

        for(const transaction of transactions) {
            totalAmount += transaction.amount || 0
        }

        return totalAmount
    },
    transTotalExpenceAndIncome:async (_parent:ICategory)=>{
        
        const transactions = await Transactions.find({categoryId: _parent._id})

        let income:number=0
        let expense:number=0

        transactions.forEach((transaction) => {
            if (transaction.amount > 0) {
              income += transaction.amount; 
            } else {
              expense += Math.abs(transaction.amount); 
            }
            
          });
      
          return {income,expense}

    },

    
    transactionsCount:async(_parent:ICategory)=>{
        
        const transactions = await Transactions.find({categoryId: _parent._id})
        return transactions.length
    }
    
}