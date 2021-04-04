import { Editor, EditorState } from 'draft-js'
import React, { useEffect, useState } from 'react'
import { BasicFieldProps } from 'src/components/form/FormRenderer'

import './Form.scss'

interface FormRichFieldProps extends BasicFieldProps<string> {
  value: string
  // TODO: need to implement
  onChange: (value: string) => void
}

const FormRichField: React.FC<FormRichFieldProps> = props => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
  }, [editorState])

  return <div className="field">
    <label>{props.label}</label>
    <div className="ui rich-editor">
      <Editor ariaLabel={props.label} editorState={editorState} onChange={setEditorState} />
    </div>
  </div>
}

export default React.memo(FormRichField, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error
})
