import { Typography } from '@material-tailwind/react';
import React from 'react';

const Post = () => {
  return (
    <div className="px-3 rounded shadow my-2">
      <Typography variant="lead">Lorem ipsum dolor sit amet!</Typography>
      <Typography variant="paragraph">lorem</Typography>
      <Typography variant="small" className="text-right">
        ~ rezzak
      </Typography>
    </div>
  );
};

export default Post;
