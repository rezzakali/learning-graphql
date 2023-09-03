const typeDefs = `#graphql
   
   type Query {
        posts:[Post]
        post(_id:ID!):Post
        users:[User]
        user(_id:ID!):User
    }

    type deletePost {
        success:Boolean
        message:String
    }

    input updateInput {
        title:String
        body:String
    }

    type updatePost {
        success:Boolean
        message:String
        new:Post
    }

    type Mutation {
        register(newUser:userInput!):User
        login(loginUser:userLoginInput!):Token
        createPost(addPost:postInput!):String
        deletePost(_id:ID!):deletePost
        updatePost(_id:ID!,value:updateInput!):updatePost
    }

    type Post {
        user:userType
        _id:ID
        title:String
        body:String
    }

    type userType {
        name:String
        email:String
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
`;

export default typeDefs;
