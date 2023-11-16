import { startApolloServer } from "./app.js";
import { typeDefs } from "./graphql/typeDef.js";
import { resolver } from "./graphql/resolvers.js";
import { connectDB } from "./db.js";

connectDB();

startApolloServer(typeDefs, resolver);
