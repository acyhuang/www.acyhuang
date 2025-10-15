import { ImgHTMLAttributes } from 'react'

interface ClickableImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onImageClick: (src: string) => void
}

/**
 * Custom image component that triggers overlay on click
 * Used as MDX component override for all <img> elements
 */
export function ClickableImage({ onImageClick, src, ...props }: ClickableImageProps) {
  const handleClick = () => {
    if (src) {
      onImageClick(src)
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

