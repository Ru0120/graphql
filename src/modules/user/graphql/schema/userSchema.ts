export const userSchemaTypes = `
    type User{
        id:ID!
        email:String
        userName:String
        createdAt:String
        updatedAt:String
    }
`;

export const userSchemaQueries = `
    getProfile: User
`;

export const userSchemaMutations = `
    updateProfile(userName: String, email:String): User
`;
