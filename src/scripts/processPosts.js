const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');
const outputDirectory = path.join(process.cwd(), 'src/components/posts');

// Function to extract image paths from markdown content
function extractImagePaths(content) {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(match => ({ alt: match[1], src: match[2] }));
}

fs.readdirSync(postsDirectory).forEach(filename => {
  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract image paths
  const images = extractImagePaths(content);

  // Generate import statements for images
  const imageImports = images.map((image, index) => {
    const imageName = `image${index + 1}`;
    return `import ${imageName} from '${image.src}';`;
  }).join('\n');

  const outputContent = `
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PostHeader from '../postHeader';
import ClickableImage from '../ClickableImage';
${imageImports}

const postDetails = ${JSON.stringify(data, null, 2)};

const ${data.title.replace(/\s+/g, '')} = () => {
  const imageMap = {
    ${images.map((image, index) => `'${image.src}': image${index + 1}`).join(',\n    ')}
  };

  const components = {
    img: ({src, alt, ...props}) => (
      <ClickableImage 
        src={imageMap[src] || src} 
        alt={alt} 
        className="w-full mb-4" 
        {...props} 
      />
    ),
    p: ({children}) => <p className="mb-4">{children}</p>
  };

  return (
    <div className="text-container">
      <PostHeader {...postDetails} />
      <ReactMarkdown components={components}>
        {\`${content}\`}
      </ReactMarkdown>
    </div>
  );
};

export default ${data.title.replace(/\s+/g, '')};
`;

  const outputPath = path.join(outputDirectory, `${path.parse(filename).name}.js`);
  fs.writeFileSync(outputPath, outputContent);
});