import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.post(import.meta.VITE_BASE_URL, {
        query: `
          query getPosts {
            posts {
              _id
              title
              body
              user {
                name
                email
              }
            }
          }`,
      });

      console.log(response.data); // Assuming the data is in response.data
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
