import { useQuery } from '@apollo/client';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { USER_WITH_POSTS } from '../gqlOperations/queries';

const User = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER_WITH_POSTS, {
    variables: {
      id,
    },
  });

  console.log(data);
  return (
    <div className="p-5">
      {loading && <Typography>Loading...</Typography>}
      <Typography variant="lead" className="text-center">
        Your Posts
      </Typography>
      {!loading &&
        data?.user?.posts?.length > 0 &&
        data.user.posts.map((post, index) => {
          const { title, body } = post;
          return (
            <div key={index} className="p-3 shadow my-2 rounded w-2/3 mx-auto">
              <Typography>{title}</Typography>
              <Typography variant="small">{body}</Typography>
            </div>
          );
        })}
    </div>
  );
};

export default User;
