import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const authMiddleware = ({ req }) => {
  const token = req.headers.authorization || '';

  if (
    req.body.operationName === 'Register' ||
    req.body.operationName === 'loginUser'
  ) {
    return {};
  }

  if (!token) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    return { _id };
  } catch (error) {
    throw new Error('Authentication failed!');
  }
};

export default authMiddleware;
