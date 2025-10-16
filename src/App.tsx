import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Analytics } from '@vercel/analytics/react';
import { Nav } from './components/Nav'
import { Work } from './pages/Work'
import { About } from './pages/About'
import { Project } from './pages/Project'
import { MediaOverlay } from './components/MediaOverlay'
import { ClickableImage, ClickableVideo } from './components/ClickableMedia'
import { Video } from './components/Video'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [currentMediaSrc, setCurrentMediaSrc] = useState<string | null>(null)
  const [currentMediaType, setCurrentMediaType] = useState<'image' | 'video' | null>(null)

  useEffect(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('darkMode') as Theme | null
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    // Update DOM and localStorage when theme changes
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const openMedia = (src: string, type: 'image' | 'video') => {
    setCurrentMediaSrc(src)
    setCurrentMediaType(type)
  }

  const closeMedia = () => {
    setCurrentMediaSrc(null)
    setCurrentMediaType(null)
  }

  // Create custom media components with handlers bound
  const CustomImage = (props: any) => (
    <ClickableImage {...props} onMediaClick={openMedia} />
  )

  const CustomVideo = (props: any) => (
    <ClickableVideo {...props} onMediaClick={openMedia} />
  )

  const CustomCapitalVideo = (props: any) => (
    <Video {...props} onMediaClick={openMedia} />
  )

  // MDX component overrides that apply globally
  const mdxComponents = {
    img: CustomImage,
    video: CustomVideo,
    Video: CustomCapitalVideo,
  }

  return (
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
            <Nav theme={theme} onToggleTheme={toggleTheme} />
          <div className="max-w-xl mx-auto p-4 mt-4 mb-16">
            <Routes>
              <Route path="/" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/work/:slug" element={<Project />} />
            </Routes>
          </div>
          <MediaOverlay mediaSrc={currentMediaSrc} mediaType={currentMediaType} onClose={closeMedia} />
        </div>
        <Analytics/>
      </BrowserRouter>
    </MDXProvider>
  )
}

export default App
