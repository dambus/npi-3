import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type PropsWithChildren } from 'react'

interface HeaderMetricsContextValue {
  height: number
  setHeaderElement: (element: HTMLElement | null) => void
}

const HeaderMetricsContext = createContext<HeaderMetricsContextValue | undefined>(undefined)

export function HeaderMetricsProvider({ children }: PropsWithChildren<unknown>) {
  const [headerElement, setHeaderElement] = useState<HTMLElement | null>(null)
  const [height, setHeight] = useState(0)

  const handleSetHeaderElement = useCallback((element: HTMLElement | null) => {
    setHeaderElement(element)
  }, [])

  useLayoutEffect(() => {
    const element = headerElement
    if (!element) {
      setHeight(0)
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--site-header-height', '0px')
      }
      return
    }

    const updateHeight = () => {
      const next = Math.round(element.getBoundingClientRect().height)
      setHeight(next)
      document.documentElement.style.setProperty('--site-header-height', `${next}px`)
    }

    updateHeight()

    const observer = new ResizeObserver(() => updateHeight())
    observer.observe(element)
    window.addEventListener('resize', updateHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [headerElement])

  const value = useMemo(
    () => ({
      height,
      setHeaderElement: handleSetHeaderElement,
    }),
    [height, handleSetHeaderElement],
  )

  return <HeaderMetricsContext.Provider value={value}>{children}</HeaderMetricsContext.Provider>
}

export function useHeaderMetrics() {
  const context = useContext(HeaderMetricsContext)
  if (!context) {
    throw new Error('useHeaderMetrics must be used within a HeaderMetricsProvider')
  }
  return context
}

