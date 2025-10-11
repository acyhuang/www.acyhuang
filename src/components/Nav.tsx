import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'

interface NavProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

/**
 * Navigation component displayed on all pages
 */
export function Nav({ theme, onToggleTheme }: NavProps) {
// export function Nav({  }: NavProps) {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path
  
  return (
    <nav className="flex justify-end items-center space-x-4 px-4 py-3 border-b border-red-500">
      <Link 
        to="/" 
        className={`text-sm font-mono ${
          isActive('/') ? 'font-medium' : 'text-muted-foreground hover:underline'
        }`}
      >
        WORK
      </Link>
      <Link 
        to="/about" 
        className={`text-sm font-mono ${
          isActive('/about') ? 'font-medium' : 'text-muted-foreground hover:underline'
        }`}
      >
        ABOUT
      </Link>
      <button
        onClick={onToggleTheme}
        className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-foreground hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </nav>
  )
}

