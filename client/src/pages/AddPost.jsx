import { Button, Card, Input, Textarea } from '@material-tailwind/react';
import React, { useState } from 'react';

const AddPost = () => {
  const [post, setPost] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
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
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPost;
