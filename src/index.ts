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
import { authSchemaMutations } from "./modules/auth/graphql/schema/authSchema";
import { authMutations } from "./modules/auth/graphql/mutations/authMutations";
import { userQueries } from "./modules/user/graphql/queries/userQueries";
import { userMutations } from "./modules/user/graphql/mutations/userMutations"

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => console.error(err));

const app = express();

const typeDefs = `
  ${userSchemaTypes}

  type Query{
    ${userSchemaQueries}
  }

  type Mutation{
    ${userSchemaMutations}
    ${authSchemaMutations}
  }
`;

const resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
  },
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
            const tokendata = jwt.verify(token, "token") as any;

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
