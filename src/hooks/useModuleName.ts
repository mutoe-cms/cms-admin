import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppKey } from 'src/appMenu'

const useModuleName = () => {
  const { pathname } = useLocation()
  const [appKey, setAppKey] = useState<AppKey>()
  const [moduleKey, setModuleKey] = useState<string | null>(null)

  useEffect(() => {
    const matcher = /^\/(\w+)(?:\/(\w+))?\/?/
    const [, appKey, moduleKey] = pathname.match(matcher) ?? []
    setAppKey(appKey as AppKey)
    setModuleKey(moduleKey ?? null)
  }, [pathname])

  return {
    appKey,
    moduleKey,
  }
}

export default useModuleName
