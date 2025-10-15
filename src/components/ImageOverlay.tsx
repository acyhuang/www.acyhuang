import { useEffect } from 'react'

interface ImageOverlayProps {
  imageSrc: string | null
  onClose: () => void
}

/**
 * Full-screen overlay component for displaying enlarged images
 * Handles ESC key and backdrop clicks to close
 */
export function ImageOverlay({ imageSrc, onClose }: ImageOverlayProps) {
  useEffect(() => {
    if (!imageSrc) return

    // Prevent body scroll when overlay is open
    document.body.style.overflow = 'hidden'

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [imageSrc, onClose])

  if (!imageSrc) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image overlay"
    >
      <img
        src={imageSrc}
        alt="Enlarged view"
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

