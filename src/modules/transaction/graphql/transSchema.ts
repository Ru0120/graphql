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
getTransactions:[Transaction]

getTransaction(
     id:String):String

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