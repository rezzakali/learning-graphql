import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import colors from 'colors';
import dotenv from 'dotenv';
import connectionToDb from './config/dbConnection.js';
import authMiddleware from './middleware/authMiddleware.js';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './schema/graphqlSchema.js';

// environment config using dotenv package
dotenv.config();

// enable colors
colors.enable();

// call db connection function
connectionToDb();

// create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: authMiddleware,
});

console.log(`🚀  your server is running successfully on : ${url}`);
