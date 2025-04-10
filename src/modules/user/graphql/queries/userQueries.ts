import { checkLogin } from "../../../../utils/checkLogin";
import { Context } from "../../../../utils/types";
import { Transactions } from "../../../transaction/model/transModel";
import { Users } from "../../model/userModel";
import { IUser } from "../../types";

export const userQueries = {
  getProfile: async (_parents: undefined, _: undefined, { user }: Context) => {
        checkLogin(user);
        const profile = await Users.getProfile(user.userId);
    return profile;
  },
};

export const userResolver={
  
  transactions: async (_parents:IUser)=>{
    
    return await Transactions.find({UserId:_parents._id})
  },

  userTotalAmount: async(_parent:IUser)=>{
    
    const transactions=await Transactions.find({userId:_parent._id})
    
    let totalAmount:number=0

    for (const transaction of transactions){
      
      totalAmount+=transaction.amount || 0
     
    }
    return totalAmount
  },

  userTotalExpenceIncome: async(_parent:IUser)=>{
    const IncomeExpence=await Transactions.find({userId:_parent._id})

    let income:number=0
    let expense:number=0
    
    IncomeExpence.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount; 
      } else {
        expense += Math.abs(transaction.amount); 
      }
      
    });

    return {income,expense}

  },

  userTransactionCount:async(_parent:IUser)=>{

    const transactions=await Transactions.find({userId:_parent._id})
    return transactions.length
  }
  

}
