import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const location = useLocation()
  const { pathname, hash } = location

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'

      return () => {
        window.history.scrollRestoration = prev
      }
    }

    return
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const header = document.querySelector('[data-site-header]') as HTMLElement | null
    const headerHeight = header?.getBoundingClientRect().height ?? 0

    if (hash) {
      const target = document.querySelector(hash) as HTMLElement | null
      if (target) {
        const targetTop = target.getBoundingClientRect().top + (window.scrollY ?? 0)
        const offsetTop = Math.max(0, targetTop - headerHeight)
        window.scrollTo({ top: offsetTop, left: 0, behavior: 'auto' })
        window.requestAnimationFrame(() => {
          window.dispatchEvent(new Event('scroll'))
        })
        return
      }
    }

    const scrollingElement = document.scrollingElement ?? document.documentElement
    scrollingElement.scrollTop = 0
    if (document.body) {
      document.body.scrollTop = 0
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('scroll'))
    })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
