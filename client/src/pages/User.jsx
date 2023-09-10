import { useQuery } from '@apollo/client';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserPost from '../components/UserPost';
import { USER_WITH_POSTS } from '../gqlOperations/queries';

const User = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER_WITH_POSTS, {
    variables: {
      id,
    },
  });

  const { name, email, phone, username } = data?.user?.user || {};
  return (
    <div className="p-5">
      {loading && !error && <Typography>Loading...</Typography>}
      <Typography variant="lead">Your credentials :</Typography>

      <div>
        <Typography>Email : {email}</Typography>
        <Typography>Your name : {name}</Typography>
        <Typography>Username : {username}</Typography>
        <Typography>Phone : {phone}</Typography>
      </div>

      <Typography variant="lead" className="text-center">
        Your Posts
      </Typography>
      {!loading &&
        data?.user?.posts?.length > 0 &&
        data.user.posts.map((post, index) => {
          return <UserPost key={index} post={post} />;
        })}
    </div>
  );
};

export default User;
