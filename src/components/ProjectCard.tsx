import { Link } from 'react-router-dom'

interface ProjectCardProps {
  title: string
  description: string
  date: string
  slug: string
  cover?: string
  tags: string[]
}

/**
 * Project card component - displays project summary
 * Entire card is clickable and navigates to project detail page
 */
export function ProjectCard({
  title,
  description,
  slug,
  cover,
}: ProjectCardProps) {
  return (
    <Link
      to={`/work/${slug}`}
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

