export const transSchemaTypes=`
type Transaction{

   id:ID
   amount: Float,
   categoryId: String,
   date: String,
   description: String,
   type: String,
   userId: String,
}
`;

export const transSchemaQueries=`
 
  getTransactions(categoryId: String, categoryIds: [String], limit: Int, page: Int, skip: Int, sortBy: String, sortOrder: Int, type: String, sortByDate: String, orderByDate: Int, 
  minAmount: Int, maxAmount: Int): [Transaction],

  getTransaction(id:ID!):Transaction
`;
export const transSchemaMutations=`
createTransaction(
    amount: Float!, 
    categoryId: ID!,
    date: String!, 
    description: String!,
    type: String!): Transaction

updateTransaction(
    amount: Float!,
    categoryId: ID!,
    date: String!, 
    description: String!,
    type: String!,
    userId: ID!): Transaction

deleteTransaction(
    id: ID!): Transaction
`