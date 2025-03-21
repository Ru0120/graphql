export const userSchemaTypes = `
type User{
id:ID!
email:String
password:String
username:String
createdAt:String
updatedAt:String
}
`;
export const userSchemaQueries = `
user:User
`;
export const userSchemaMutations = `
userUpdate(
userName:String!
email:String!):String
`;
