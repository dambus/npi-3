import { useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { cn } from '../lib/cn'

const SHOW_THRESHOLD = 320

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const offset = window.scrollY || window.pageYOffset
      setVisible(offset > SHOW_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-primary text-white transition duration-300 ease-out hover:border-brand-accent/70 hover:bg-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent',
        'shadow-[0_20px_45px_rgba(4,15,40,0.45)]',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}

export default BackToTopButton
