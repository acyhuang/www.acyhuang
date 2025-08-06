import React, { useState, useEffect } from 'react';
import MarkdownPage from './MarkdownPage';
import PostHeader from './postHeader';
import { getPostMetadata } from '../utils/postsUtils';

const PostPage = ({ postSlug }) => {
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const postMetadata = await getPostMetadata(postSlug);
        if (postMetadata) {
          setMetadata(postMetadata);
        }
      } catch (error) {
        console.error('Error loading post metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postSlug) {
      loadMetadata();
    }
  }, [postSlug]);

  if (loading) {
    return <div className="text-container">Loading...</div>;
  }

  return (
    <div className="text-container">
      <PostHeader {...metadata} />
      <MarkdownPage 
        contentPath={`posts/${postSlug}.md`}
        className="mt-6"
      />
    </div>
  );
};

export default PostPage;