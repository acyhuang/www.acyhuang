import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const MarkdownPage = ({ contentPath, className = 'text-container' }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Use fetch to load markdown file from public folder
        const response = await fetch(`/content/${contentPath}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const markdownText = await response.text();
        
        // Simple frontmatter parsing (assuming no frontmatter for now)
        setContent(markdownText);
      } catch (err) {
        console.error('Error loading markdown content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (contentPath) {
      loadContent();
    }
  }, [contentPath]);

  // Custom components for ReactMarkdown
  const components = {
    // Preserve internal Link components for React Router
    a: ({ href, children, ...props }) => {
      // Check if it's an internal link (starts with ./ or just a path)
      if (href && (href.startsWith('./') || (href.startsWith('/') && !href.includes('://')))) {
        const cleanHref = href.startsWith('./') ? href.substring(2) : href;
        return <Link to={`/${cleanHref}`} {...props}>{children}</Link>;
      }
      // External links get target="_new" (matching existing pattern)
      return <a href={href} target="_new" {...props}>{children}</a>;
    },
    // Style paragraphs with margin
    p: ({ children }) => <p className="mb-4">{children}</p>,
    // Style lists with spacing
    ul: ({ children }) => <ul className="space-y-2 mb-4">{children}</ul>,
    // Style headings
    h1: ({ children }) => <h1 className="mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4">{children}</h3>,
  };

  if (loading) {
    return <div className={className}>Loading...</div>;
  }

  if (error) {
    return <div className={className}>Error: {error}</div>;
  }

  return (
    <div className={className}>
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPage;