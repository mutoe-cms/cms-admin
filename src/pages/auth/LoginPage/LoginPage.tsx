import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import FormRenderer, { FormRef } from 'src/components/FormRenderer'
import useAuthorizationContext from 'src/contexts/authorization.context'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/LoginPage.form'
import { service, useSubmit } from 'src/services'

const LoginPage: React.FC = () => {
  const formRef: FormRef = useRef(null)
  const navigate = useNavigate()
  const { loading, profile, mountAuthorization } = useAuthorizationContext()
  const { submitting, onSubmit: onLogin } = useSubmit(formRef, service.auth.login)

  const redirectToFrom = () => {
    // TODO: redirect to from URI
    navigate('/', { replace: true })
  }

  if (loading) {
    return <Loader />
  }

  if (profile) {
    redirectToFrom()
    return null
  }

  const onSubmit = async (form: typeof loginForm) => {
    try {
      const authRo = await onLogin(form)
      mountAuthorization(authRo)
      redirectToFrom()
    } catch (e) {
      // TODO: error handling
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
