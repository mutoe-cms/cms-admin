import React from 'react'
import { Form } from 'semantic-ui-react'
import { BasicFieldProps, InputFieldConfig } from 'src/components/form/FormRenderer'

export interface FormInputFieldProps extends InputFieldConfig, BasicFieldProps<string> {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

const FormInputField: React.FC<FormInputFieldProps> = (props) => {
  return <Form.Input
    {...props}
    onChange={(_, { value }) => props.onChange(value)}
  />
}

export default React.memo(FormInputField, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error
})
