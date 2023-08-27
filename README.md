# 🚀 Learning GraphQL with Apollo Server 🌌

This guide will walk you through the process of learning GraphQL with Apollo Server. Take it one step at a time, and feel free to reach out if you have any questions!

## Prerequisites

- Basic understanding of JavaScript and Node.js.
- Familiarity with REST APIs is a plus but not required.

## GraphQL

### A query language for your API

1. GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

2. GraphQL provides a complete and understandable description of the data in your API.

3. Gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## Apollo Server

Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

#### You can use Apollo Server as:

1. The GraphQL server for a subgraph in a federated supergraph

2. An add-on to any new or existing Node.js apps—this includes apps running on Express (including MERN stack apps), AWS Lambda, Azure Functions, Cloudflare, Fastify, and more

#### Apollo Server Provides:

1. **Straightforward setup**, so your client developers can start fetching data quickly.

2. **Incremental adoption**, enabling you to add features as they're needed.

3. **Universal compatibility**, with any data source, any build tool, and any GraphQL client.

4. **Production readiness**, enabling you to confidently run your graph in production

## Step 1: Create a new project

1. **Create a directory** for a new project and cd into it:

   ```bash
   mkdir graphql
   cd graphql
   ```

2. **Initialize a new Node.js project with npm**: Install required packages for Apollo Server and GraphQL:

   ```bash
   npm init --yes && npm pkg set type="module"
   ```

## Step 2: Install dependencies

Applications that run Apollo Server require two top-level dependencies:

1. **graphql** (also known as graphql-js) is the library that implements the core GraphQL parsing and execution algorithms.

2. **@apollo/server** is the main library for Apollo Server itself. Apollo Server knows how to turn **HTTP** requests and responses into **GraphQL operations** and run them in an extensible context with support for plugins and other features.

Run the following command to install both of these packages and save them in your project's node_modules directory:

```bash
npm install @apollo/server graphql
```

## Step 3: Define your GraphQL schema

Every GraphQL server (including Apollo Server) uses a schema to define the structure of data that clients can query

3. **Define Schema**: Define GraphQL schema using the `graphql` template literal:

   ```javascript
   const typeDefs = `#graphql
     type Book {
       title:String
       author:String
     }
     type Query {
        books:[Book]
    }
   `;
   ```

Adding #graphql to the beginning of a template literal provides GraphQL syntax highlighting in supporting IDEs.

## Step 4: Define your data set

Apollo Server can fetch data from any source you connect to (including a database, a REST API, a static object storage service, or even another GraphQL server)

```bash
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];
```

## Step 5: Define a resolver

We've defined our data set, but Apollo Server doesn't know that it should use that data set when it's executing a query. To fix this, we create a resolver.

Resolvers tell Apollo Server how to fetch the data associated with a particular type. Because our Book array is hardcoded, the corresponding resolver is straightforward.

```javascript
const resolvers = {
  Query: {
    books: () => books,
  },
};
```

## Step 6: Create an instance of ApolloServer

We've defined our schema, data set, and resolver. Now we need to provide this information to Apollo Server when we initialize it.

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

#### Passing an ApolloServer instance to the `startStandaloneServer` function:

```javascript
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
```

## Step 7: Start the server

```bash
npm start
```

2. **Access GraphQL Playground**: Open your web browser and go to `http://localhost:4000/`.

3. **Run a Query**: In the Playground, type this query and hit "Play":

   ```graphql
   query {
     books
   }
   ```

## Notes

- Schema defines data types and operations using GraphQL SDL.
- Resolvers provide data for schema fields.
- Apollo Server includes a built-in Playground.
- You can expand your schema as your project grows.

Happy learning! 🚀

---

Feel free to customize this README as you go along your learning journey. Enjoy exploring GraphQL and Apollo Server!
