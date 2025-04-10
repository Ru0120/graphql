export const categorySchemaTypes=`

type test {
    income:Float
    expense:Float
}
        
type Category{
        id:ID
        name:String
        status:String
        description:String
        createdAt:String
        updatedAt:String
        transactions: [Transaction]
        transactionsTotalAmount:Float
        transTotalExpenceAndIncome:test
        transactionsCount:Float

}
`;
export const categorySchemaQueries=`
    getCategories:[Category]
    getCategory(id:ID!):Category
     `;
export const categorySchemaMutations=`
    createCategory(name:String!,status:String!,description:String):Category
    updateCategory(name:String,status:String!,description:String):Category
    deleteCategory(id:ID!):Category
`
;
    
