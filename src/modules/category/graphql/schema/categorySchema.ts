export const categorySchemaTypes=`
        type Category{
        id:ID
        name:String
        status:String
        description:String
        createdAt:String
        updatedAt:String
        }
`;
export const categorySchmaQueries=`
    getCategories:[Category]
    getCategory(id:String):String
     `;
export const categorySchemaMutations=`
    createCategory(name:String!,status:String!,description:String):Category
    updateCategory(name:String,status:String!,description:String):Category
    deleteCategory(id:ID!):Category
`
;
    
