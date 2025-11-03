import { useCallback, useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projectTypes'
import type { ProjectQueryOptions } from '../data/projectTypes'
import { fetchProjects } from '../data/projectsRepository'

type UseProjectsArgs = Pick<ProjectQueryOptions, 'includeDrafts'>

export function useProjectsQuery({ includeDrafts = false }: UseProjectsArgs = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const loadProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchProjects({ includeDrafts })
      if (!isMountedRef.current) return
      setProjects(data)
    } catch (err) {
      if (!isMountedRef.current) return
      setError(err instanceof Error ? err : new Error('Failed to load projects'))
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [includeDrafts])

  useEffect(() => {
    void loadProjects()
  }, [loadProjects])

  return {
    projects,
    isLoading,
    error,
    reload: loadProjects,
  }
}

export function usePublishedProjects() {
  return useProjectsQuery({ includeDrafts: false })
}

export function useProjectBySlug(slug: string | undefined) {
  const { projects, isLoading, error, reload } = usePublishedProjects()

  const project = slug ? projects.find((item) => item.slug === slug) : undefined

  return {
    projects,
    project,
    isLoading,
    error,
    reload,
  }
}
