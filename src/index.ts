import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Context } from "../src/utils/types";
import {
  userSchemaTypes,
  userSchemaQueries,
  userSchemaMutations,
} from "./modules/user/graphql/schema/userSchema";
import{
  categorySchemaTypes,
  categorySchemaQueries,
  categorySchemaMutations
}from "./modules/category/graphql/schema/categorySchema"
import{
  transSchemaTypes,
  transSchemaQueries,
  transSchemaMutations
}from "./modules/transaction/graphql/transSchema"
import { authSchemaMutations } from "./modules/auth/graphql/authSchema";
import { authMutations } from "./modules/auth/graphql/authMutations";
import { userQueries,userResolver } from "./modules/user/graphql/queries/userQueries";
import { userMutations } from "./modules/user/graphql/mutations/userMutations"
import{catagoriesQueries, categoryResolver}from "./modules/category/graphql/queries/categoryQueries"
import{ categoryMutations}from"./modules/category/graphql/mutations/categoryMutations"
import { transactionQueries, } from "./modules/transaction/graphql/transQueries";
import{transMutations}from "./modules/transaction/graphql/transMutations"


dotenv.config();

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => console.error(err));

const app = express();



const typeDefs = `
  ${userSchemaTypes}
  ${categorySchemaTypes}
  ${transSchemaTypes}
  
  type Query{
    ${userSchemaQueries}
    ${categorySchemaQueries}
    ${transSchemaQueries}
  }

  type Mutation{
    ${userSchemaMutations}
    ${authSchemaMutations}
    ${categorySchemaMutations}
    ${transSchemaMutations}
  }
`;

const resolvers = {
  Query: {
    ...userQueries,
    ...catagoriesQueries,
    ...transactionQueries
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
    ...categoryMutations,
    ...transMutations,
    
  },

  Category: {
    ...categoryResolver,
    
  },

  User:{
    ...userResolver
  }
};

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
     context: async ({ req, res }) => {
        const token = req.headers.authorization;
        if (token) {
          try {
            const tokendata = jwt.verify(token,"token") as any;

            return { user: tokendata };
          } catch {
            return { user: null };
          }
        }

        return { user: null };
      },
    })
  );

  app.listen(4000, () => {
    console.log("server started on 4000");
  });
};

startServer();
