import React, { useState, useEffect } from 'react'
import { Editor, EditorState } from 'draft-js'

interface RichEditorProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    // console.log(editorState)
  }, [editorState])

  return <div className="field">
    <label>{props.label}</label>
    <div className="ui rich-editor">
      <Editor ariaLabel={props.label} editorState={editorState} onChange={setEditorState} />
    </div>
  </div>
}

export default RichEditor
