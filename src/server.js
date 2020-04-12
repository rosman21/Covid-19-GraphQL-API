import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./controllers/apollo/typeDefs";
import { resolvers } from "./controllers/apollo/resolvers";
import { ApolloServer } from "apollo-server-express";
dotenv.config();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !(process.env.NODE_ENV === "production"),
});
const PORT = process.env.PORT || 5000;
export const app = express();

app.use(cors());
app.use(morgan("dev"));

apolloServer.applyMiddleware({ app, path: "/api/graphql" });
export const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(
        `🚀 GRAPHQL API on running on PORT: ${PORT} PATH: ${apolloServer.graphqlPath}`
      );
    });
  } catch (e) {
    console.error(e);
  }
};
