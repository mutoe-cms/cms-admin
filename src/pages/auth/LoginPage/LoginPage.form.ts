import { FormConfig } from 'src/components/form/FormRenderer'

export const loginForm = {
  username: '',
  password: '',
}

export const loginFormFields: FormConfig<typeof loginForm> = [
  {
    type: 'text',
    name: 'username',
    required: true,
    label: 'Username',
    placeholder: 'Username',
    maxLength: 16,
    minLength: 5,
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    label: 'Password',
    placeholder: 'Password',
    maxLength: 16,
    minLength: 6,
  },
]
