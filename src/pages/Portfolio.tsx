import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPortfolioProjects, type ProjectMetadata } from '../lib/projects'

interface PortfolioProjectCardProps {
  title: string
  description: string
  time: string
  slug: string
  cover?: string
  tags: string[]
}

function PortfolioProjectCard({
  title,
  description,
  slug,
  cover,
}: PortfolioProjectCardProps) {
  return (
    <Link
      to={`/portfolio/${slug}`}
      className="block group transition-colors overflow-hidden"
    >
      <div className="border-t border-border py-6 space-y-4">

        {cover && (
          <div className="aspect-video overflow-hidden">
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span className="group-hover:underline">{title}</span>
            <span className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-200">↗</span>
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}

/**
 * Portfolio page - displays project 
 */
export function Portfolio() {
  const [projects, setProjects] = useState<ProjectMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPortfolioProjects()
      .then((loadedProjects) => {
        setProjects(loadedProjects)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load projects:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="mx-auto px-4">
            <div className="mb-8 text-3xl font-medium">
                <span className="">Allison Huang </span>
                <span className="text-muted-foreground">/ Portfolio</span>
            </div>
            {loading ? (
                <p className="text-muted-foreground">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-muted-foreground">No projects to display yet.</p>
            ) : ( 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <PortfolioProjectCard
                    key={project.slug}
                    title={project.title}
                    description={project.description}
                    time={project.time}
                    slug={project.slug}
                    cover={project.cover}
                    tags={project.tags}
                    />
                ))}
                </div>
            )}
        </div>
    </div>
  )
}

