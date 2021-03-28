import { kebabCase, pick } from 'lodash'
import React, { useState } from 'react'
import { Form, FormDropdownProps, StrictDropdownProps } from 'semantic-ui-react'
import { SelectFieldConfig, SelectOption } from 'src/components/form/FormRenderer'

interface SelectFieldConfigProps<T> extends Omit<Partial<SelectFieldConfig<T>>, 'type'> {
  error?: string
}
interface SingleSelect<T, V extends SelectOption['value'] = string> extends SelectFieldConfigProps<T> {
  value: V
  multiple?: false
  onChange: (value: V) => void
}
interface MultipleSelect<T, V extends SelectOption['value'] = string> extends SelectFieldConfigProps<T> {
  value: V[]
  multiple: true
  onChange: (value: V[]) => void
}
export type FormSelectFieldProps<T> = SingleSelect<T> | MultipleSelect<T>

function FormSelectField <T> (props: FormSelectFieldProps<T>) {
  const [options, setOptions] = useState<SelectOption[]>(props.options ?? [])

  const onChange = (value: StrictDropdownProps['value']) => {
    if (Array.isArray(value)) {
      props.onChange(value.map(v => kebabCase(String(v))) as any)
    } else {
      props.onChange(kebabCase(String(value)) as any)
    }
  }

  const onAddItem = (value: SelectOption['value']) => {
    // TODO: dynamic add tags
    const newOption: SelectOption = { text: String(value), value: kebabCase(String(value)) }
    setOptions(options => [...options, newOption])
  }

  const dropdownProps: FormDropdownProps = {
    ...pick(props, ['value', 'multiple', 'disabled', 'placeholder', 'required', 'label', 'error']),
    options,
    allowAdditions: props.creatable,
    selection: true,
    search: true,
    'aria-label': props.label,
    onChange: (_, { value }) => onChange(value),
    onAddItem: (_, { value }) => onAddItem(value as string),
  }

  return <Form.Dropdown {...dropdownProps} />
}

export default FormSelectField
