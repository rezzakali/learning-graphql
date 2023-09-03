import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const posts = await axios.get('http://localhost:4000/', {
      query: `query getPosts {
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
    console.log(posts);
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
