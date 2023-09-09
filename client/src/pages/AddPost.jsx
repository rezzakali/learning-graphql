import { useMutation } from '@apollo/client';
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { CREATE_POST } from '../gqlOperations/queries';

const AddPost = () => {
  const [post, setPost] = useState({});

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({
      variables: {
        addPost: post,
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen my-5">
      <Card className="w-96 p-5">
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="md"
              label="Title"
              required
              name="title"
              onChange={(e) => handleChange(e)}
            />
            <Textarea
              type="text"
              size="md"
              label="Body"
              name="body"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error && (
            <Typography className="text-red-400">{error.message}</Typography>
          )}
          {data && (
            <Typography className="text-green-400">
              {data.createPost}
            </Typography>
          )}

          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? 'Loading' : 'Add Post'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPost;
