import { GraphQLError } from 'graphql';
import JWT from 'jsonwebtoken';
import { comparePassword, hashedPassword } from '../helpers/authHelpers.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find({}).populate('user', 'name email').exec();
        return posts;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('There was a server side error!');
      }
    },
    post: async (_, { _id }) => await Post.findOne({ _id }),

    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('There was a server side error!');
      }
    },
    user: async (_, { _id }) => await User.findOne({ _id }),
  },

  Mutation: {
    // register
    register: async (_, { newUser }) => {
      const { email, password } = newUser;

      //  check if user already exist or not
      const isUserExist = await User.findOne({ email });

      // if exists throw new error
      if (isUserExist) {
        throw new Error('User already exist with this email!');
      }

      // hashing password
      const hashingPassword = await hashedPassword(password);

      // new user
      const user = new User({
        ...newUser,
        password: hashingPassword,
      });

      return await user.save();
    },

    // login
    login: async (_, { loginUser }) => {
      const { email, password } = loginUser;

      const user = await User.findOne({ email });

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
      const newPost = new Post({
        userId: _id,
        ...addPost,
      });
      await newPost.save();
      return 'You have successfully created a post!';
    },

    // delete a post
    deletePost: async (_, { _id }) => {
      try {
        await Post.findByIdAndDelete({ _id });
        return {
          success: true,
          message: 'Post deleted successfully!',
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    // update a post
    updatePost: async (_, { value, _id }) => {
      try {
        const res = await Post.findByIdAndUpdate(
          { _id },
          { $set: value },
          { new: true }
        );
        return {
          success: true,
          message: 'Post updated successfully!',
          new: res,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default resolvers;
