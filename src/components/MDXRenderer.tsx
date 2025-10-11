import { type ReactNode } from 'react'

interface MDXRendererProps {
  children: ReactNode
}

/**
 * Wrapper component for MDX content that applies Tailwind typography styles
 */
export function MDXRenderer({ children }: MDXRendererProps) {
  return (
    <div className="prose prose-base prose-neutral dark:prose-invert max-w-none">
      {children}
    </div>
  )
}

