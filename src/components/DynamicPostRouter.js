import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAllPosts } from '../utils/postsUtils';
import PostPage from './PostPage';

const DynamicPostRouter = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const posts = await getAllPosts();
        const postRoutes = posts.map((post) => ({
          path: post.slug,
          element: <PostPage postSlug={post.slug} />
        }));
        setRoutes(postRoutes);
        setLoading(false);
      } catch (error) {
        console.error('Error loading post routes:', error);
        setRoutes([]);
        setLoading(false);
      }
    };
    
    loadRoutes();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route 
          key={index} 
          path={route.path} 
          element={route.element} 
        />
      ))}
    </Routes>
  );
};

export default DynamicPostRouter;