/**
 * Project metadata type
 */
export interface ProjectMetadata {
  title: string
  description: string
  time: string
  slug: string
  cover?: string
  tags: string[]
  order: number
  show: boolean
}

/**
 * Project type with content component
 */
export interface Project {
  metadata: ProjectMetadata
  Content: React.ComponentType
}

/**
 * Load all projects from the content/projects directory
 * Filters by show: true and sorts by pinned, then date
 */
export async function getProjects(): Promise<ProjectMetadata[]> {
  // Import all MDX files from projects directory
  const modules = import.meta.glob<{
    default: React.ComponentType
    frontmatter?: ProjectMetadata
  }>('../content/projects/*.mdx', { eager: true })

  const projects: ProjectMetadata[] = []

  for (const path in modules) {
    const module = modules[path]
    
    // Try to extract metadata from the module
    // Note: We'll need to configure MDX to export frontmatter
    if (module.frontmatter) {
      const metadata = module.frontmatter
      
      // Only include projects with show: true
      if (metadata.show) {
        projects.push(metadata)
      }
    }
  }

  // Sort by order ascending (lowest number first)
  projects.sort((a, b) => a.order - b.order)

  return projects
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const modules = import.meta.glob<{
    default: React.ComponentType
    frontmatter?: ProjectMetadata
  }>('../content/projects/*.mdx', { eager: true })

  for (const path in modules) {
    const module = modules[path]
    
    if (module.frontmatter?.slug === slug) {
      return {
        metadata: module.frontmatter,
        Content: module.default,
      }
    }
  }

  return null
}

