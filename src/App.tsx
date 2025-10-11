import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Work } from './pages/Work'
import { About } from './pages/About'
import { Project } from './pages/Project'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme | null
    
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

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
          <Nav theme={theme} onToggleTheme={toggleTheme} />
        <div className="max-w-lg mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/:slug" element={<Project />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
