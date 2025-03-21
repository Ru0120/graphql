export const authSchemaTypes = `
type User{
username:String
password:String
}
`;
export const authSchemaMutations = `
login(username:String!,password:String!):String
register(username:String!,password:String!,email:String):String
`;
