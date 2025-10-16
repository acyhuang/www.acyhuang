import { useRef } from 'react'
import type { ImgHTMLAttributes, VideoHTMLAttributes } from 'react'

type ClickableImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  onMediaClick: (src: string, type: 'image' | 'video') => void
}

type ClickableVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  onMediaClick: (src: string, type: 'image' | 'video') => void
}

/**
 * Custom image component that triggers overlay on click
 * Used as MDX component override for all <img> elements
 */
export function ClickableImage({ onMediaClick, src, ...props }: ClickableImageProps) {
  const handleClick = () => {
    if (src) {
      onMediaClick(src, 'image')
    }
  }

  return (
    <img
      {...props}
      src={src}
      onClick={handleClick}
      className={`cursor-pointer ${props.className || ''}`}
    />
  )
}

/**
 * Custom video component that triggers overlay on click
 * Used as MDX component override for all <video> elements
 */
export function ClickableVideo({ onMediaClick, children, ...props }: ClickableVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)


  const handleClick = () => {
    
    // Try to get src from props first
    let videoSrc: string | undefined = props.src

    // Try to extract from React children (source elements)
    if (!videoSrc && children) {
      // Handle both single child and array of children
      const childArray = Array.isArray(children) ? children : [children]
      
      for (const child of childArray) {
        // Check if this is a React element with props.src
        if (child && typeof child === 'object' && 'props' in child) {
          const childProps = (child as any).props
          if (childProps?.src) {
            videoSrc = childProps.src
            break
          }
        }
      }
    }

    // Fallback: try to get from DOM
    if (!videoSrc && videoRef.current) {
      videoSrc = videoRef.current.currentSrc
      console.log('From currentSrc:', videoSrc)
      
      if (!videoSrc) {
        const sourceElement = videoRef.current.querySelector('source')
        if (sourceElement) {
          videoSrc = sourceElement.src
          console.log('From source element:', videoSrc)
        }
      }
    }

    console.log('Final videoSrc:', videoSrc)
    
    if (videoSrc) {
      onMediaClick(videoSrc, 'video')
    } else {
      console.error('Could not find video src!')
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

