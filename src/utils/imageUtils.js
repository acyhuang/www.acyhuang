// Utility functions for processing images in markdown content

/**
 * Extract image paths from markdown content using regex
 * Returns array of objects with alt text and src path
 */
export const extractImagePaths = (content) => {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(match => ({ 
    alt: match[1], 
    src: match[2] 
  }));
};

/**
 * Normalize image path for dynamic import
 * Handles relative paths and converts them to importable paths
 */
export const normalizeImagePath = (imagePath) => {
  // Remove leading ./ if present
  let normalizedPath = imagePath.startsWith('./') ? imagePath.substring(2) : imagePath;
  
  // Handle relative paths like ../../assets/
  if (normalizedPath.startsWith('../')) {
    // Convert relative path to absolute path from src/assets
    normalizedPath = normalizedPath.replace(/\.\.\/\.\.\/assets\//, '../assets/');
    normalizedPath = normalizedPath.replace(/\.\.\/assets\//, '../assets/');
  }
  
  // Ensure path starts with ../assets/ for dynamic import
  if (!normalizedPath.startsWith('../assets/') && !normalizedPath.startsWith('/') && !normalizedPath.startsWith('http')) {
    normalizedPath = `../assets/${normalizedPath}`;
  }
  
  return normalizedPath;
};

// Cache for dynamic imports to avoid re-importing the same image
const imageCache = new Map();

/**
 * Clear the image cache (useful when switching between dynamic and public assets)
 */
export const clearImageCache = () => {
  imageCache.clear();
};

/**
 * Dynamically import an image asset with caching
 * Returns a promise that resolves to the imported image module
 */
export const dynamicImportImage = async (imagePath) => {
  const normalizedPath = normalizeImagePath(imagePath);
  
  // Check cache first
  if (imageCache.has(normalizedPath)) {
    return imageCache.get(normalizedPath);
  }
  
  try {
    // Use dynamic import to load the image
    const imageModule = await import(normalizedPath);
    const imageUrl = imageModule.default || imageModule;
    
    // Cache the result
    imageCache.set(normalizedPath, imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.warn(`Failed to dynamically import image: ${imagePath}`, error);
    
    // Cache null result to avoid repeated failed attempts
    imageCache.set(normalizedPath, null);
    return null;
  }
};

/**
 * Create image map from array of image paths
 * Returns object mapping original paths to imported image URLs
 */
export const createImageMap = async (imagePaths) => {
  const imageMap = {};
  const importPromises = imagePaths.map(async ({ src }) => {
    const importedImage = await dynamicImportImage(src);
    if (importedImage) {
      imageMap[src] = importedImage;
    }
    return { src, imported: importedImage };
  });
  
  await Promise.all(importPromises);
  return imageMap;
};

/**
 * Check if path is likely an asset that should be dynamically imported
 * vs a public file that should be loaded directly
 */
export const shouldDynamicImport = (imagePath) => {
  // Don't import external URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return false;
  }
  
  // Don't import absolute paths that start with /public, /static, or /assets
  if (imagePath.startsWith('/public') || imagePath.startsWith('/static') || imagePath.startsWith('/assets')) {
    return false;
  }
  
  // Import relative paths and asset paths (but not absolute /assets/ paths)
  return (imagePath.includes('assets/') && !imagePath.startsWith('/')) || imagePath.startsWith('../') || imagePath.startsWith('./');
};