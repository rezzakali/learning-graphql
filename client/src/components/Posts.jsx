import { useQuery } from '@apollo/client';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { GET_POSTS } from '../gqlOperations/queries';
import Post from './Post';

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading && <Typography>Loading...</Typography>}
      {!loading && data?.posts?.length <= 0 && (
        <Typography>No Posts Found!</Typography>
      )}
      {!loading &&
        !error &&
        data?.posts?.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default Posts;
