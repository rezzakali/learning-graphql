import { useMutation } from '@apollo/client';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { DELETE_POST, UPDATE_POST } from '../gqlOperations/queries';

const UserPost = ({ post }) => {
  const { title, body, _id } = post;
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState();
  const [editBody, setEditBody] = useState();

  const [updatePost, { loading, data, error }] = useMutation(UPDATE_POST);

  const [
    deletePost,
    { loading: isDeleting, data: response, error: deleteError },
  ] = useMutation(DELETE_POST);

  const handleEdit = (post) => {
    setIsEdit(() => !isEdit);
    const { title, body } = post;
    setEditTitle(title);
    setEditBody(body);
  };

  const handleSubmitEdit = () => {
    const data = { title: editTitle, body: editBody };
    updatePost({
      variables: {
        id: _id,
        value: data,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setIsEdit(false);
    }
  }, [data]);

  const handleDelete = (_id) => {
    deletePost({
      variables: {
        id: _id,
      },
    });
  };

  useEffect(() => {
    if (response) {
      setIsEdit(false);
    }
  }, [response]);

  return (
    <div className="relative p-3 shadow my-2 rounded w-2/3 mx-auto">
      <div
        className="absolute top-1 right-1 cursor-pointer"
        onClick={() => handleEdit(post)}
      >
        <AiOutlineEdit />
      </div>
      <div
        className="absolute top-1 right-7 text-red-400 cursor-pointer"
        onClick={() => handleDelete(_id)}
      >
        <AiOutlineDelete />
      </div>
      {isEdit ? (
        <div className="space-y-2 mt-3">
          <Input
            label="Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Textarea
            label="Body"
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          {data && (
            <Typography className="text-green-500">
              {data.updatePost?.message}
            </Typography>
          )}

          {isEdit && (
            <Button onClick={handleSubmitEdit} disabled={loading}>
              {loading ? 'Loading...' : 'Edit'}
            </Button>
          )}
        </div>
      ) : (
        <>
          {response && (
            <Typography className="text-green-500">
              {response.deletePost?.message}
            </Typography>
          )}
          <Typography>{title}</Typography>
          <Typography variant="small">{body}</Typography>
        </>
      )}
    </div>
  );
};

export default UserPost;
