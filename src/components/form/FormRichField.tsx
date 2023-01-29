import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import { BasicFieldProps } from 'src/components/form/FormRenderer'

import 'react-quill/dist/quill.snow.css'
import './Form.scss'

interface FormRichFieldProps extends Partial<BasicFieldProps<string>> {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

const FormRichField: React.FC<FormRichFieldProps> = props => {
  const [focus, setFocus] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    const onFocus = () => setFocus(true)
    const onBlur = () => setFocus(false)
    el?.addEventListener('focus', onFocus, { capture: true })
    el?.addEventListener('blur', onBlur, { capture: true })

    return () => {
      el?.removeEventListener('focus', onFocus)
      el?.removeEventListener('blur', onBlur)
    }
  }, [])

  // TODO: support required prop
  // TODO: support error prop

  return <div className='field'>
    <label>{props.label}</label>

    <div ref={ref} className='ui rich-editor' data-testid='editor-wrapper'>
      <ReactQuill
        className={classNames({ focus })}
        theme='snow'
        placeholder={props.placeholder}
        readOnly={props.disabled}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
    </div>
  </div>
}

export default React.memo(FormRichField, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value
    && prevProps.error === nextProps.error
})
