export const authSchemaTypes = `
    type User{
        username:String
        password:String
    }
`;

export const authSchemaMutations = `
    register(userName:String!,password:String!,email:String):Boolean
    login(email: String, password: String):String
`;
