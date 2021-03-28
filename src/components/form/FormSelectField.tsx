import { kebabCase, pick, xor } from 'lodash'
import React, { useState } from 'react'
import { Form, FormDropdownProps, Icon, StrictDropdownProps } from 'semantic-ui-react'
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
      if (value.length < options.length) {
        const deleted = xor(value, options.map(o => o.value))
        setOptions(options => options.filter(o => !o.image || !deleted.includes(o.value)))
      }
      props.onChange(value.map(v => kebabCase(String(v))) as any)
    } else {
      props.onChange(kebabCase(String(value)) as any)
    }
  }

  const onAddItem = async (value: SelectOption['value']) => {
    const text = String(value)
    const newOption: SelectOption = {
      text: text,
      value: kebabCase(text),
      disabled: true,
      image: <Icon loading name="spinner" />,
    }
    setOptions(options => [...options, newOption])
    try {
      const returnValue = (await props.onAddItem?.(newOption)) || newOption
      setOptions(options => {
        const index = options.findIndex(o => o.text === text)
        options[index].disabled = undefined
        options[index].image = undefined
        options[index].value = returnValue.value
        options[index].text = returnValue.text
        return [...options]
      })
    } catch (e) {
      setOptions(options => {
        const index = options.findIndex(o => o.text === text)
        options[index].disabled = true
        options[index].image = <Icon name="times" color="red" />
        return [...options]
      })
    }
  }

  const dropdownProps: FormDropdownProps = {
    ...pick(props, ['value', 'multiple', 'disabled', 'placeholder', 'required', 'label', 'error']),
    options,
    allowAdditions: props.creatable,
    selection: true,
    search: true,
    clearable: !props.required,
    'aria-label': props.label,
    onChange: (_, { value }) => onChange(value),
    onAddItem: async (_, { value }) => await onAddItem(value as string),
  }

  return <Form.Dropdown {...dropdownProps} />
}

export default FormSelectField
