import { useRef } from 'react'
import type { VideoHTMLAttributes, ReactNode } from 'react'

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  onMediaClick?: (src: string, type: 'video') => void
  children?: ReactNode
}

/**
 * Custom Video component for MDX that opens in an overlay when clicked
 * Use this as <Video> in MDX files instead of <video>
 */
export function Video({ onMediaClick, children, ...props }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = () => {
    if (!onMediaClick) return
    
    // Try to get src from props first
    let videoSrc: string | undefined = props.src

    // Fallback: try to get from DOM
    if (!videoSrc && videoRef.current) {
      videoSrc = videoRef.current.currentSrc
      
      if (!videoSrc) {
        const sourceElement = videoRef.current.querySelector('source')
        if (sourceElement) {
          videoSrc = sourceElement.src
        }
      }
    }

    if (videoSrc) {
      onMediaClick(videoSrc, 'video')
    }
  }

  return (
    <video
      {...props}
      ref={videoRef}
      onClick={handleClick}
      className={`cursor-pointer ${props.className || ''}`}
    >
      {children}
    </video>
  )
}

