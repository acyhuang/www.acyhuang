import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MDXRenderer } from '../components/MDXRenderer'
import { getProjectBySlug, type Project as ProjectType } from '../lib/projects'
import { Badge } from '../components/Badge'
import { Link } from 'react-router-dom'

/**
 * Project detail page - displays individual project content
 */
export function PortfolioProject() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<ProjectType | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }

    getProjectBySlug(slug)
      .then((loadedProject) => {
        if (loadedProject) {
          setProject(loadedProject)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load project:', error)
        setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <p className="text-muted-foreground">Loading project...</p>
  }

  if (notFound || !project) {
    return <Navigate to="/" replace />
  }

  const { Content, metadata } = project

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-4">
      <div className="mx-auto mb-4 text-sm font-mono md:px-6">
        <Link to="/portfolio" className="text-muted-foreground hover:underline">
        ← PORTFOLIO 
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">{metadata.title}</h1>
            <p className="text-sm font-mono text-muted-foreground">{metadata.time}</p>
            <div className="flex flex-wrap gap-2 mt-2">
            {metadata.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
            ))}
            </div>
        </div>

        <MDXRenderer>
            <Content />
        </MDXRenderer>

        <div className="mx-auto mt-16 text-muted-foreground text-sm font-mono text-center hover:underline">
          <Link to="/portfolio">
              Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}

