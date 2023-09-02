const typeDefs = `#graphql
    type Book {
        title:String
        author:String
    }

    type Post {
        userId:ID
        _id:ID
        title:String
        body:String
    }

    type User {
        _id:ID
        name:String
        username:String
        email:String
        phone:String
        password:String
        posts:[Post]
    }

    input userInput {
        name:String!
        username:String!
        email:String!
        phone:String!
        password:String!
    }

    input userLoginInput {
        email:String!
        password:String!
    }

    input postInput{
        title:String!
        body:String!
    }

    type Token {
        token:String
    }

    type Query {
        books:[Book]
    }

    type Query {
        posts:[Post]
    }

    type Query {
        post(_id:ID!):Post
    }

    type Query {
        users:[User]
    }

    type Query {
        user(_id:ID!):User
    }

    type Mutation {
        register(newUser:userInput!):User
        login(loginUser:userLoginInput!):Token
        createPost(addPost:postInput!):String
    }
`;

export default typeDefs;
