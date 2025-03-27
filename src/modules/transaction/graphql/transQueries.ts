import { Transactions } from "../model/transModel";

export const transQueriesTypeDefs=`
getTransactions:[Transaction],
getTransaction:String
`;

export const transQueries={
    getTransactions: async(_parent:undefined)=>{
        return await Transactions.find();

    },

    getTransaction: async (_parent:undefined,args:{id:string})=>{
        return await Transactions.findById({_id:args.id});
    }
}