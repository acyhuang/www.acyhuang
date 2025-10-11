import { Link } from 'react-router-dom'
import { Badge } from './Badge'

interface ProjectCardProps {
  title: string
  description: string
  date: string
  slug: string
  cover: string
  tags: string[]
}

/**
 * Project card component - displays project summary
 * Entire card is clickable and navigates to project detail page
 */
export function ProjectCard({
  title,
  description,
  date,
  slug,
  cover,
  tags,
}: ProjectCardProps) {
  return (
    <Link
      to={`/work/${slug}`}
      className="block group transition-colors overflow-hidden border-t border-border"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="py-4 space-y-1">
        <h3 className="text-base font-semibold flex items-center justify-between">
          <span>{title}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
            <span className="text-sm">↗</span>
          </div>
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {/* <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div> */}
      </div>
    </Link>
  )
}

