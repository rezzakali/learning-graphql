import { randomBytes } from 'crypto';
import { books, posts, users } from './fakeDb.js';

const resolvers = {
  Query: {
    books: () => books,
    posts: () => posts,
    post: (_, { id }) => posts.find((post) => post.id == id),
    users: () => users,
    user: (_, { email }) => users.find((user) => user.email == email),
  },

  User: {
    posts: (user) => posts.filter((post) => post.userId == user.id),
  },

  Mutation: {
    addUser: (_, { newUser }) => {
      const id = randomBytes(1).toString('hex');
      users.push({
        id,
        ...newUser,
      });
      return users.find((user) => user.id == id);
    },
  },
};

export default resolvers;
