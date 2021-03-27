import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import FormRenderer from 'src/components/FormRenderer'
import useAuthorizationContext from 'src/contexts/authorization.context'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/LoginPage.form'
import { service, useSubmit } from 'src/services'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { loading, profile, mountAuthorization } = useAuthorizationContext()
  const { formRef, submitting, submitRequest: onLogin } = useSubmit(service.auth.login)

  const redirectToFrom = useCallback(() => {
    // TODO: redirect to from URI
    navigate('/dashboard', { replace: true })
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
    } catch (e) {
      // TODO: error handling
      // eslint-disable-next-line no-console
      console.error(e)
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
