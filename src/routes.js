import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

// Function to dynamically import all posts
const importAll = (r) => r.keys().map((key) => ({
  path: key.replace('./', '').replace('.js', '').toLowerCase(),
  component: lazy(() => r(key))
}));

// Dynamically import all posts from the posts directory
const postModules = importAll(require.context('./components/posts', false, /\.js$/));

// Create an array of routes
const postRoutes = postModules.map((postModule, index) => {
  const { path, component: Component } = postModule;
  return <Route key={index} path={`/${path}`} element={<Component />} />;
});

// Print the post routes to the console for verification
console.log("Post Routes:", postRoutes);

export default postRoutes;