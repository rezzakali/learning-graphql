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
};

export default resolvers;
