import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<ProfileRo | null>(null)
  const history = useHistory()

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
    if (!localToken) history.replace('/login')
    service.setSecurityData(localToken)

    try {
      setLoading(true)
      const { data: profile } = await service.user.profile()
      setProfile(profile)
    } catch (e) {
      unmountAuthorization()
      history.replace('/login')
    } finally {
      setLoading(false)
    }
  }, [history])

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
