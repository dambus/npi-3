import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import type { ProjectImage } from '../data/projectTypes'
import { cn } from '../lib/cn'

export interface ProjectGalleryProps {
  images: ProjectImage[]
  projectName: string
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchDeltaXRef = useRef<number>(0)

  useEffect(() => {
    if (activeIndex === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveIndex(null)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveIndex((index) => {
          if (index === null) return index
          return (index + images.length - 1) % images.length
        })
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveIndex((index) => {
          if (index === null) return index
          return (index + 1) % images.length
        })
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, images.length])

  useEffect(() => {
    if (activeIndex !== null) {
      closeButtonRef.current?.focus()
    }
  }, [activeIndex])

  if (!images.length) {
    return null
  }

  const openImage = (index: number) => setActiveIndex(index)
  const closeViewer = () => setActiveIndex(null)
  const showPrevious = () =>
    setActiveIndex((index) => {
      if (index === null) return index
      return (index + images.length - 1) % images.length
    })
  const showNext = () =>
    setActiveIndex((index) => {
      if (index === null) return index
      return (index + 1) % images.length
    })

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return
    touchStartXRef.current = event.touches[0].clientX
    touchDeltaXRef.current = 0
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return
    touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current
  }

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return
    const swipeThreshold = 45
    const deltaX = touchDeltaXRef.current

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        showPrevious()
      } else {
        showNext()
      }
    }

    touchStartXRef.current = null
    touchDeltaXRef.current = 0
  }

  return (
    <>
      <div className="space-y-4 mt-[6rem]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold text-brand-primary mb-4">Project gallery</h3>
          {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/70">
            {images.length} assets
          </p> */}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => openImage(index)}
              className="group relative h-48 overflow-hidden border border-brand-primary/10 bg-white shadow-[0_18px_45px_rgba(8,20,40,0.12)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent md:h-48"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full cursor-pointer object-cover transition duration-150 group-hover:scale-115"
                loading="lazy"
              />
              {/* <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-primary/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-primary shadow">
                View
              </span> */}
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(5,10,25,0.85)] backdrop-blur"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} gallery viewer`}
        >
          <button
            type="button"
            ref={closeButtonRef}
            onClick={closeViewer}
            className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white transition hover:border-white/40 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close gallery viewer"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="View previous image"
          >
            <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="View next image"
          >
            <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {images.map((image, index) => {
            const isActive = index === activeIndex
            return (
              <figure
                key={image.src}
                className={cn(
                  'pointer-events-none absolute inset-x-6 inset-y-16 flex items-center justify-center transition-opacity duration-300',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
                aria-hidden={!isActive}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-h-[80vh] max-w-[85vw] border border-white/15 object-contain shadow-[0_45px_120px_rgba(0,0,0,0.45)]"
                />
              </figure>
            )
          })}

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-2 w-8 rounded-full transition',
                  activeIndex === index ? 'bg-white' : 'bg-white/35 hover:bg-white/60',
                )}
                aria-label={`Show image ${index + 1} of ${images.length}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ProjectGallery
