export const userSchemaTypes = `

type IncomeExpence{
    income:Float
    expense:Float
}

type User{
        id:ID!
        email:String
        userName:String
        createdAt:String
        updatedAt:String
        transactions:[Transaction]
        userTotalAmount:Float
        userTotalExpenceIncome:IncomeExpence
        userTransactionCount:Float
}
`;

export const userSchemaQueries = `
    getProfile: User
`;

export const userSchemaMutations = `
    updateProfile(userName: String, email:String): User
`;
