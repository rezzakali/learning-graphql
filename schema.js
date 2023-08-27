const typeDefs = `#graphql
    type Book {
        title:String
        author:String
    }

    type Post {
        userId:ID
        id:ID
        title:String
        body:String
    }

    type User {
        id:ID
        name:String
        username:String
        email:String
        phone:String
        posts:[Post]
    }

    input userInput {
        name:String!
        username:String!
        email:String!
        phone:String!
    }

    type Query {
        books:[Book]
    }

    type Query {
        posts:[Post]
    }

    type Query {
        post(id:ID!):Post
    }

    type Query {
        users:[User]
    }

    type Query {
        user(email:String!):User
    }

    type Mutation {
        addUser(newUser:userInput!):User
    }
`;

export default typeDefs;
