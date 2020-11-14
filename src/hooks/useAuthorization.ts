import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API, defs } from 'src/services'
import StorageUtil from 'src/utils/storage.util'

export interface AuthorizationState {
  profile: defs.ProfileRo | null
  loading: boolean
  mountAuthorization: (authRo: defs.AuthRo) => void
  unmountAuthorization: () => void
}

export const authorizationTokenStorage = new StorageUtil<string>('auth_token')

export default function useAuthorization (): AuthorizationState {
  const [profile, setProfile] = useState<defs.ProfileRo | null>(null)
  const localToken = authorizationTokenStorage.get()
  const history = useHistory()

  const mountAuthorization = (authRo: defs.AuthRo) => {
    setProfile(authRo)
    authorizationTokenStorage.set(authRo.token)
  }

  const unmountAuthorization = () => {
    setProfile(null)
    authorizationTokenStorage.remove()
  }

  const retrieveUserProfile = async () => {
    try {
      const profile = await API.user.profile.request()
      setProfile(profile)
    } catch (e) {
      unmountAuthorization()
      history.replace('/login')
    }
  }

  useEffect(() => {
    localToken && retrieveUserProfile()
  }, [])

  const loading = Boolean(localToken && !profile)

  return {
    profile,
    loading,
    mountAuthorization,
    unmountAuthorization,
  }
}
