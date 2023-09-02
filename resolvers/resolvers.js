import JWT from 'jsonwebtoken';
import { comparePassword, hashedPassword } from '../helpers/authHelpers.js';
import postModel from '../models/postModel.js';
import userModel from '../models/userModel.js';

const resolvers = {
  Query: {
    posts: async () => await postModel.find(),
    post: async (_, { _id }) => await postModel.findOne({ _id }),
    users: async () => {
      try {
        const users = await userModel.find();
        return users;
      } catch (error) {
        throw new Error('There was a server side error!');
      }
    },
    user: async (_, { _id }) => await userModel.findOne({ _id }),
  },

  Mutation: {
    // register
    register: async (_, { newUser }) => {
      const { email, password } = newUser;

      //  check if user already exist or not
      const isUserExist = await userModel.findOne({ email });

      // if exists throw new error
      if (isUserExist) {
        throw new Error('User already exist with this email!');
      }

      // hashing password
      const hashingPassword = await hashedPassword(password);

      // new user
      const user = new userModel({
        ...newUser,
        password: hashingPassword,
      });

      return await user.save();
    },

    // login
    login: async (_, { loginUser }) => {
      const { email, password } = loginUser;

      const user = await userModel.findOne({ email });

      if (!user) {
        throw new Error(`User doe's not exists!`);
      }

      // compare password
      const isValidPassword = await comparePassword(user.password, password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials!');
      }

      // generate token
      const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      return { token };
    },

    // create a post
    createPost: async (_, { addPost }, { _id }) => {
      if (!_id) throw new Error('Not Logged In!');
      const newPost = new postModel({
        userId: _id,
        ...addPost,
      });
      await newPost.save();
      return 'You have successfully created a post!';
    },
  },
};

export default resolvers;
