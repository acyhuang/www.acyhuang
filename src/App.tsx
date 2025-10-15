import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Nav } from './components/Nav'
import { Work } from './pages/Work'
import { About } from './pages/About'
import { Project } from './pages/Project'
import { ImageOverlay } from './components/ImageOverlay'
import { ClickableImage } from './components/ClickableImage'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null)

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

  const openImage = (src: string) => {
    setCurrentImageSrc(src)
  }

  const closeImage = () => {
    setCurrentImageSrc(null)
  }

  // Create custom image component with handlers bound
  const CustomImage = (props: any) => (
    <ClickableImage {...props} onImageClick={openImage} />
  )

  // MDX component overrides that apply globally
  const mdxComponents = {
    img: CustomImage,
  }

  return (
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
            <Nav theme={theme} onToggleTheme={toggleTheme} />
          <div className="max-w-lg mx-auto p-4 mt-4 mb-16">
            <Routes>
              <Route path="/" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/work/:slug" element={<Project />} />
            </Routes>
          </div>
          <ImageOverlay imageSrc={currentImageSrc} onClose={closeImage} />
        </div>
      </BrowserRouter>
    </MDXProvider>
  )
}

export default App
