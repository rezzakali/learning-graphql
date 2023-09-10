import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      body
      user {
        name
        _id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($newUser: userInput!) {
    register(newUser: $newUser) {
      success
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($loginUser: userLoginInput!) {
    login(loginUser: $loginUser) {
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($addPost: postInput!) {
    createPost(addPost: $addPost)
  }
`;

export const USER_WITH_POSTS = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      user {
        _id
        username
        name
        email
        phone
      }
      posts {
        _id
        title
        body
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation Mutation($id: ID!, $value: updateInput!) {
    updatePost(_id: $id, value: $value) {
      message
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($id: ID!) {
    deletePost(_id: $id) {
      message
      success
    }
  }
`;
