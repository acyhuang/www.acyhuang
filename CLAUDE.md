# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start`
  - Uses NODE_OPTIONS=--openssl-legacy-provider for compatibility
  - Opens at http://localhost:3000
- **Build for production**: `npm run build` 
  - Uses NODE_OPTIONS=--openssl-legacy-provider for compatibility
- **Run tests**: `npm test`

## Architecture Overview

This is a personal portfolio website built with Create React App and React Router. The site uses a two-column layout with a sidebar and main content area.

### Key Components Structure

- **App.js**: Main layout with sidebar and content areas using flexbox
- **Sidebar**: Contains navigation and posts list, uses custom fonts (SF Mono, Gothic A1)
- **Home page**: Uses runtime markdown system via MarkdownPage component
- **MarkdownPage component**: Reusable component for runtime markdown loading with frontmatter support
- **Posts system**: Runtime loading of markdown files with automatic routing

### Posts Workflow

The site uses a unified runtime markdown system:

1. **Markdown files** are stored in `/public/content/posts/` directory with frontmatter metadata
2. **Posts manifest** (`/public/content/posts/index.json`) contains post metadata for discovery
3. **PostPage component** dynamically loads markdown content using MarkdownPage
4. **Routes** are automatically generated from the posts manifest

### Styling

- **Tailwind CSS** for styling with custom font families configured
- **Custom fonts**: SF Mono and Gothic A1 stored in `/src/assets/`
- **Dark theme**: Gray-950 background with gray-100 text
- **Responsive**: Mobile-first design with md: breakpoints

### Content Management

**Unified runtime system:**

- **Static pages**: Markdown files in `/public/content/` (e.g., home.md)
- **Blog posts**: Markdown files in `/public/content/posts/` with frontmatter metadata
- **Runtime loading**: All content loaded via MarkdownPage component using fetch API
- **Full image support**: 
  - Asset images: Use `/assets/image.png` paths (served from `/public/assets/`)
  - Dynamic imports: Still supported for src/assets via existing imageUtils.js
- **Hot reloading**: Immediate changes during development
- **Automatic routing**: Posts routes generated from manifest file
- **ClickableImage integration**: All images are enlargeable on click
- **Performance optimizations**: Image caching, memoized components

## Important Notes

- Uses legacy OpenSSL provider flag due to Create React App compatibility
- Vercel Analytics is integrated
- Uses dynamic routing based on posts manifest for automatic route generation

## Content Editing Workflows

**For static pages (like Home):**
1. Edit markdown files in `/public/content/`
2. Changes are reflected immediately with hot reloading
3. No build step required

**For blog posts:**
1. Create markdown files in `/public/content/posts/` with frontmatter
2. Update `/public/content/posts/index.json` with post metadata
3. Changes are reflected immediately with hot reloading
4. Routes are automatically generated - no manual route addition needed

**Using MarkdownPage component:**
```javascript
import MarkdownPage from '../MarkdownPage';
const MyPage = () => <MarkdownPage contentPath="filename.md" />;
```

**Image handling in runtime markdown:**
- **Public images**: Use absolute paths like `/assets/image.png` (stored in `/public/assets/`) - loaded directly
- **Asset images**: Use relative paths like `../../assets/image.png` - automatically bundled via dynamic imports (legacy support)
- **External images**: Use full URLs - loaded directly
- All images use ClickableImage component with zoom functionality
- Missing images show appropriate error states with loading indicators