import { useEffect } from 'react'

interface MediaOverlayProps {
  mediaSrc: string | null
  mediaType: 'image' | 'video' | null
  onClose: () => void
}

/**
 * Full-screen overlay component for displaying enlarged images or videos
 * Handles ESC key and backdrop clicks to close
 */
export function MediaOverlay({ mediaSrc, mediaType, onClose }: MediaOverlayProps) {
  useEffect(() => {
    if (!mediaSrc) return

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
  }, [mediaSrc, onClose])

  if (!mediaSrc || !mediaType) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media overlay"
    >
      {mediaType === 'image' ? (
        <img
          src={mediaSrc}
          alt="Enlarged view"
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <video
          src={mediaSrc}
          controls
          autoPlay
          loop
          muted
          playsInline
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
}

