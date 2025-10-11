import { MDXRenderer } from '../components/MDXRenderer'
import AboutContent from '../content/about.mdx'

/**
 * About page that renders the about.mdx content
 */
export function About() {
  return (
    <MDXRenderer>
      <AboutContent />
    </MDXRenderer>
  )
}

