import { useState, useEffect } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { getProjects, type ProjectMetadata } from '../lib/projects'

/**
 * Work page - displays project list (home page)
 */
export function Work() {
  const [projects, setProjects] = useState<ProjectMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
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
    <div>
      <div className="mb-8 text-3xl font-medium">
        <span className="">Allison Huang </span>
        <span className="text-muted-foreground">is a designer and tinkerer working on AI experiences and human-AI interaction</span>
      </div>
      <div className="py-2">
        <p className="text-sm font-mono text-muted-foreground">HIGHLIGHTS</p>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects to display yet.</p>
      ) : ( 
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              date={project.date}
              slug={project.slug}
              cover={project.cover}
              tags={project.tags}
            />
          ))}
        </div>
      )}
    </div>
  )
}

