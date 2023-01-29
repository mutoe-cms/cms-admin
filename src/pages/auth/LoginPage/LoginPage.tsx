import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import FormRenderer from 'src/components/form/FormRenderer'
import useAuthorizationContext from 'src/contexts/authorization/authorization.context'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/LoginPage.form'
import { routeMap } from 'src/route'
import { service, useSubmit } from 'src/services'

import './LoginPage.scss'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { loading, profile, mountAuthorization } = useAuthorizationContext()
  const { formRef, submitting, submitRequest: onLogin } = useSubmit(service.auth.login)

  const redirectToFrom = useCallback(() => {
    // TODO: redirect to from URI
    navigate(routeMap.home, { replace: true })
  }, [navigate])

  useEffect(() => {
    if (profile) redirectToFrom()
  }, [profile, redirectToFrom])

  if (loading) {
    return <Loader />
  }

  const onSubmit = async (form: typeof loginForm) => {
    try {
      const authRo = await onLogin(form)
      mountAuthorization(authRo)
      redirectToFrom()
    } catch (error) {
      // TODO: error handling
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return <div className='LoginPage'>
    <FormRenderer
      ref={formRef}
      className='form'
      submitting={submitting}
      fields={loginFormFields}
      initForm={loginForm}
      onSubmit={onSubmit}
    />
  </div>
}

export default LoginPage
