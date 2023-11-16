import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import http from "http";

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  // app.use('/', (req,res) => res.send('Welcome to my API'))

  const serverGraphQL = new ApolloServer({
    typeDefs,
    resolvers
  });

  await serverGraphQL.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(serverGraphQL));

  await new Promise((resolve) =>
    httpServer.listen({
      port: 4000,
    }, resolve)
  );
  console.log(`Server ready at 4000`)
}
