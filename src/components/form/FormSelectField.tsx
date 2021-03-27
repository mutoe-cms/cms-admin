import { kebabCase } from 'lodash'
import React, { useState } from 'react'
import { Form, FormDropdownProps, StrictDropdownProps } from 'semantic-ui-react'
import { SelectFieldConfig, SelectOption } from 'src/components/FormRenderer'

type SelectFieldConfigProps<T> = Partial<Omit<SelectFieldConfig<T>, 'type'>>
type SingleSelect<T, V extends SelectOption['value'] = string> = SelectFieldConfigProps<T> & {
  value: V
  multiple?: false
  onChange: (value: V) => void
}
type MultipleSelect<T, V extends SelectOption['value'] = string> = SelectFieldConfigProps<T> & {
  value: V[]
  multiple: true
  onChange: (value: V[]) => void
}
export type FormSelectFieldProps<T> = SingleSelect<T> | MultipleSelect<T>

function FormSelectField <T> (props: FormSelectFieldProps<T>) {
  const { value, multiple, disabled, placeholder, required, label } = props
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
    label,
    value,
    options,
    multiple,
    disabled,
    placeholder,
    required,
    selection: true,
    allowAdditions: true,
    search: true,
    'aria-label': label,
    onChange: (_, { value }) => onChange(value),
    onAddItem: (_, { value }) => onAddItem(value as string),
  }

  return <Form.Dropdown {...dropdownProps} />
}

export default FormSelectField
