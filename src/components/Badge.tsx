interface BadgeProps {
  children: React.ReactNode
  className?: string
}

/**
 * Badge component for displaying tags
 */
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 ${className}`}
    >
      {children}
    </span>
  )
}

