import { Typography } from '@material-tailwind/react';
import React from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const { title, body, user } = post || {};
  const { name, _id } = user || {};
  return (
    <div className="px-3 rounded shadow my-2 w-2/3 mx-auto hover:shadow-lg">
      <Typography variant="lead">{title}</Typography>
      <Typography variant="paragraph">{body}</Typography>
      <Typography variant="small" className="text-right mb-2">
        <Link to={`/user/${_id}`}>
          ~ <Avatar name={name} size="40" className="rounded-full" /> {name}{' '}
        </Link>
      </Typography>
    </div>
  );
};

export default Post;
