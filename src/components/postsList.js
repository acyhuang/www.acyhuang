import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEArrow from '../assets/arrow.svg';
import { getAllPosts } from '../utils/postsUtils';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await getAllPosts();
        const allPosts = [
          ...postsData
        ];
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="">
        <div className="text-gray-400 text-sm">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 uppercase text-sm text-gray-400 border-b border-gray-700">Title</th>
            <th className="text-left py-2 px-4 uppercase text-sm text-gray-400 border-b border-gray-700">Tag</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td className="text-left py-2 border-b border-gray-700">
                <div className="flex items-end">
                    <img src={SEArrow} alt="arrow icon" className="py-0 w-2 h-2 mr-2 mb-1.5" />
                    <Link to={post.path || `/${post.slug}`} className="hover:no-underline">{post.title}</Link>
                </div>
              </td>
              <td className="text-left text-gray-400 py-2 px-4 border-b border-gray-700">{post.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsList;
