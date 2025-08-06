import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import ClickableImage from './ClickableImage';
import { extractImagePaths, createImageMap, shouldDynamicImport, clearImageCache } from '../utils/imageUtils';

const MarkdownPage = ({ contentPath, className = 'text-container' }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageMap, setImageMap] = useState({});
  const [imagesLoading, setImagesLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setImagesLoading(true);
        
        // Clear image cache to avoid stale imports
        clearImageCache();
        
        // Use fetch to load markdown file from public folder
        const response = await fetch(`/content/${contentPath}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const markdownText = await response.text();
        
        // Set content directly (no frontmatter parsing)
        setContent(markdownText);
        
        // Extract and process images from content
        const imagePaths = extractImagePaths(markdownText);
        
        if (imagePaths.length > 0) {
          // Filter images that should be dynamically imported
          const dynamicImages = imagePaths.filter(img => shouldDynamicImport(img.src));
          
          if (dynamicImages.length > 0) {
            try {
              const dynamicImageMap = await createImageMap(dynamicImages);
              setImageMap(dynamicImageMap);
            } catch (imageError) {
              console.warn('Error loading some images:', imageError);
              // Continue with partial image map
            }
          }
        }
        
        setImagesLoading(false);
      } catch (err) {
        console.error('Error loading markdown content:', err);
        setError(err.message);
        setImagesLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (contentPath) {
      loadContent();
    }
  }, [contentPath]);

  // Memoize components to prevent unnecessary re-renders
  const components = useMemo(() => ({
    // Handle images with dynamic imports and ClickableImage
    img: ({ src, alt, ...props }) => {
      // Check if we have a dynamically imported version
      const dynamicSrc = imageMap[src];
      
      if (dynamicSrc) {
        // Use ClickableImage component with dynamically imported image
        return (
          <ClickableImage 
            src={dynamicSrc}
            alt={alt} 
            className="w-full mb-4" 
            {...props} 
          />
        );
      } else if (shouldDynamicImport(src)) {
        // Image should be dynamic but not loaded yet - show loading or placeholder
        return (
          <div className="w-full mb-4 bg-gray-800 rounded flex items-center justify-center h-48">
            {imagesLoading ? (
              <span className="text-gray-400">Loading image...</span>
            ) : (
              <span className="text-gray-400">Image not found: {alt || src}</span>
            )}
          </div>
        );
      } else {
        // Handle public folder images or external URLs directly
        return (
          <ClickableImage 
            src={src}
            alt={alt} 
            className="w-full mb-4" 
            {...props} 
          />
        );
      }
    },
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
  }), [imageMap, imagesLoading]);

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