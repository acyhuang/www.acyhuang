# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start`
  - Uses NODE_OPTIONS=--openssl-legacy-provider for compatibility
  - Opens at http://localhost:3000
- **Build for production**: `npm run build` 
  - Uses NODE_OPTIONS=--openssl-legacy-provider for compatibility
- **Run tests**: `npm test`
- **Process posts**: `npm run process-posts`
  - Converts markdown posts to React components

## Architecture Overview

This is a personal portfolio website built with Create React App and React Router. The site uses a two-column layout with a sidebar and main content area.

### Key Components Structure

- **App.js**: Main layout with sidebar and content areas using flexbox
- **Sidebar**: Contains navigation and posts list, uses custom fonts (SF Mono, Gothic A1)
- **Home page**: Now uses hybrid markdown system via MarkdownPage component
- **MarkdownPage component**: Reusable component for runtime markdown loading
- **Posts system**: Build-time conversion of markdown files to React components

### Posts Workflow

The site has a unique posts system that converts markdown files to React components:

1. **Markdown files** are stored in `/posts/` directory with frontmatter metadata
2. **processPosts.js script** converts markdown to React components in `/src/components/posts/`
3. **Generated components** use ReactMarkdown with custom image handling via ClickableImage
4. **Routes** are manually defined in `index.js` (dynamic routing code exists but is commented out)

### Styling

- **Tailwind CSS** for styling with custom font families configured
- **Custom fonts**: SF Mono and Gothic A1 stored in `/src/assets/`
- **Dark theme**: Gray-950 background with gray-100 text
- **Responsive**: Mobile-first design with md: breakpoints

### Content Management

**Two-tiered system:**

1. **Runtime markdown loading** (for pages like Home):
   - Markdown files stored in `/public/content/` directory
   - Loaded at runtime using MarkdownPage component via fetch API
   - Enables hot reloading during development
   - Custom ReactMarkdown components handle internal/external links and styling

2. **Build-time conversion** (for posts):
   - Post metadata is extracted from markdown frontmatter
   - Images in posts are automatically imported and mapped for proper bundling
   - Posts list is dynamically generated from available post components

## Important Notes

- Uses legacy OpenSSL provider flag due to Create React App compatibility
- Vercel Analytics is integrated
- Some dynamic routing code exists but is disabled in favor of manual route definitions

## Content Editing Workflows

**For static pages (like Home):**
1. Edit markdown files in `/public/content/`
2. Changes are reflected immediately with hot reloading
3. No build step required

**For blog posts:**
1. Create/edit markdown files in `/posts/` directory
2. Run `npm run process-posts` to generate React components
3. Manually add routes to `src/index.js` if needed

**Using MarkdownPage component:**
```javascript
import MarkdownPage from '../MarkdownPage';
const MyPage = () => <MarkdownPage contentPath="filename.md" />;
```