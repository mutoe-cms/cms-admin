import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routeMap } from 'src/route'
import { service } from 'src/services'
import { AuthRo, ProfileRo } from 'src/services/api'
import StorageUtil from 'src/utils/storage.util'

export interface AuthorizationState {
  profile: ProfileRo | null
  loading: boolean
  mountAuthorization: (authRo: AuthRo) => void
  unmountAuthorization: () => void
}

const authorizationTokenStorage = new StorageUtil<string>('auth_token')

export default function useAuthorization (): AuthorizationState {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileRo | null>(null)
  const navigate = useNavigate()

  const mountAuthorization = (authRo: AuthRo) => {
    setProfile(authRo)
    authorizationTokenStorage.set(authRo.token)
    service.setSecurityData(authRo.token)
  }

  const unmountAuthorization = () => {
    setProfile(null)
    authorizationTokenStorage.remove()
    service.setSecurityData(null)
  }

  const retrieveUserProfile = useCallback(async () => {
    const localToken = authorizationTokenStorage.get()
    if (!localToken) {
      unmountAuthorization()
      navigate(routeMap.login, { replace: true })
      setLoading(false)
      return
    }
    service.setSecurityData(localToken)

    try {
      setLoading(true)
      const { data: profile } = await service.user.profile()
      setProfile(profile)
    } catch (e) {
      unmountAuthorization()
      navigate(routeMap.login, { replace: true })
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    void retrieveUserProfile()
  }, [retrieveUserProfile])

  return {
    profile,
    loading,
    mountAuthorization,
    unmountAuthorization,
  }
}
