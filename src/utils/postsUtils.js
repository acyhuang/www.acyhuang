// Utility functions for loading posts data

/**
 * Fetch posts manifest from public/content/posts/index.json
 * Returns array of post metadata objects
 */
export const loadPostsManifest = async () => {
  try {
    const response = await fetch('/content/posts/index.json');
    if (!response.ok) {
      throw new Error(`Failed to load posts manifest: ${response.status}`);
    }
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error loading posts manifest:', error);
    return [];
  }
};

/**
 * Get all posts with metadata
 * Useful for generating navigation and lists
 */
export const getAllPosts = async () => {
  return await loadPostsManifest();
};

/**
 * Get a specific post by slug
 * Returns post metadata or null if not found
 */
export const getPostBySlug = async (slug) => {
  const posts = await loadPostsManifest();
  return posts.find(post => post.slug === slug) || null;
};

/**
 * Get metadata for a specific post by slug
 * Returns post metadata object or null if not found
 */
export const getPostMetadata = async (slug) => {
  const post = await getPostBySlug(slug);
  return post;
};

/**
 * Check if a post exists by slug
 */
export const postExists = async (slug) => {
  const post = await getPostBySlug(slug);
  return post !== null;
};