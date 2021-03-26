import { pick } from 'lodash'
import React, { useImperativeHandle, useState } from 'react'
import { Form } from 'semantic-ui-react'
import RichEditor from 'src/components/RichEditor'
import { ERROR_MESSAGE } from 'src/constants/message'
import { fieldErrorSeparator, focusErrorField, sentence } from 'src/utils/form.util'

interface FieldBasicConfig<T> {
  name: T
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

interface InputFieldConfig<T> extends FieldBasicConfig<T> {
  type: 'input' | 'password'
  maxLength?: number
  minLength?: number
  regexp?: RegExp
}

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldConfig<T> extends FieldBasicConfig<T> {
  type: 'select'
  multiple?: boolean
  options: SelectOption[]
}

interface RichTextFieldConfig<T> extends FieldBasicConfig<T> {
  type: 'rich'
  maxLength?: number
}

export type FieldConfig<K> = InputFieldConfig<K> | RichTextFieldConfig<K> | SelectFieldConfig<K>

type FormValue = number | boolean | string | string[] | number[]

type FormData<T extends string> = Record<T, FormValue>

export type FormConfig<TForm extends FormData<string>> = FieldConfig<keyof TForm>[]

interface FormRendererHandle {
  setError: (fieldName: string, errorMessage?: string) => boolean
}

interface FormRendererProps<K extends string, F extends FormData<K>> {
  fields: FieldConfig<K>[]
  initForm?: F
  submitText?: string
  onSubmit?: (form: F) => Promise<Record<string, string> | void>
  submitting?: boolean
  className?: string
}

function FormRenderer<K extends string, F extends FormData<K>> (props: FormRendererProps<K, F>, forwardedRef: React.Ref<FormRendererHandle>): React.ReactElement {
  const [form, setForm] = useState<F>(props.initForm ?? {} as F)
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({})

  const setError = (fieldName: string, errorMessage?: string) => {
    if (errorMessage) {
      errorMessage = errorMessage
        .split(fieldErrorSeparator)
        .map(sentence)
        .join(fieldErrorSeparator)
    }
    setErrors(prev => ({ ...prev, [fieldName]: errorMessage }))
    return !errorMessage
  }

  useImperativeHandle(forwardedRef, () => ({
    setError,
  }))

  const onChange = (field: FieldConfig<K>, value: FormValue) => {
    setForm(prev => ({ ...prev, [field.name]: value }))
    setError(field.name)
  }

  const validateField = (field: FieldConfig<K>, newValue?: FormValue): boolean => {
    const value = newValue ?? form[field.name]
    if (field.required && !value) return setError(field.name, ERROR_MESSAGE.REQUIRED(field.label))
    switch (field.type) {
      case 'input':
      case 'password': {
        const inputValue = value as string
        if (field.minLength && inputValue.length < field.minLength) return setError(field.name, ERROR_MESSAGE.MIN_LENGTH(field.label, field.minLength))
        break
      }
      case 'select': {
        // TODO: select field validation
        break
      }
      default:
        break
    }

    return setError(field.name)
  }

  const onSubmit = async () => {
    const validateResults = props.fields.map(field => validateField(field))
    if (!validateResults.every(valid => valid)) return focusErrorField()

    await props.onSubmit?.(form)
  }

  const renderFields = props.fields.map(field => {
    const fieldProps = {
      ...pick(field, ['label', 'placeholder', 'required', 'disabled', 'name']),
      'aria-label': field.label,
      error: errors[field.name],
      key: field.name,
    }
    switch (field.type) {
      case 'input':
      case 'password': {
        return <Form.Input
          {...fieldProps}
          value={form[field.name] ?? ''}
          type={field.type === 'input' ? 'text' : field.type}
          maxLength={field.maxLength}
          onChange={(_, { value }) => onChange(field, value)}
          onBlur={() => validateField(field)}
        />
      }
      case 'rich': {
        return <RichEditor {...fieldProps} />
      }
      case 'select':
        return <Form.Dropdown
          {...fieldProps}
          selection
          allowAdditions
          search
          multiple={field.multiple}
          value={form[field.name] ?? ''}
          options={field.options}
          onChange={(_, { value }) => onChange(field, value as FormValue)}
          onAddItem={(_, { value }) => onChange(field, value as FormValue)}
        />
    }
    return null
  })

  return <Form noValidate data-testid="form" className={props.className} onSubmit={onSubmit}>

    {renderFields}

    <Form.Button
      primary
      aria-label='Submit'
      type="submit"
      content={props.submitText ?? 'Submit'}
      loading={props.submitting}
    />
  </Form>
}

export type FormRef = React.RefObject<FormRendererHandle> | null

type ForwardRefFormRenderer = <K extends string, F extends FormData<K>>(props: FormRendererProps<K, F> & React.RefAttributes<FormRendererHandle>) => React.ReactElement | null

export default React.forwardRef(FormRenderer) as ForwardRefFormRenderer
