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

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => console.error(err));

const app = express();

interface User {
  email: string;
  password: string;
  userName: string;
}
const typeDefs = `
${userSchemaTypes}

type Query{
${userSchemaQueries}
}

type Mutation{
${userSchemaMutations}
}
`;
const resolvers = {
  Query: {},
  Mutation: {},
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
            const tokendata = jwt.verify(token, "secret") as any;

            return { user: tokendata?.user };
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
