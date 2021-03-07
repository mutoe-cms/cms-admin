import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { service } from 'src/services'
import { AuthRo, ProfileRo } from 'src/services/api'

export interface AuthorizationState {
  profile: ProfileRo | null
  loading: boolean
  mountAuthorization: (authRo: AuthRo) => void
  unmountAuthorization: () => void
}

export default function useAuthorization (): AuthorizationState {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<ProfileRo | null>(null)
  const history = useHistory()

  const mountAuthorization = (authRo: AuthRo) => {
    setProfile(authRo)
    service.setSecurityData(authRo.token)
  }

  const unmountAuthorization = () => {
    setProfile(null)
    service.setSecurityData(null)
  }

  const retrieveUserProfile = useCallback(async () => {
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
