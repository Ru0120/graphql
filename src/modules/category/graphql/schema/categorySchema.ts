export const categorySchemaTypes=`
        type Category{
        id:ID
        name:string
        status:string
        description:string!
        createdAt:String
        updatedAt:String
        }
`;
export const categorySchmaQueries=`
    getCategories:Categories
    getCategory(id:String):Category
     `;
export const categorySchemaMutations=`
    createCategory(name:String):String
    updateCategory(id:String,name:String,description:String):Category
    deleteCategories(id:String):String
         
`;
    
