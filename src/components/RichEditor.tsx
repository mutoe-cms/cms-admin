import React, { useState, useEffect } from 'react'
import { Editor, EditorState } from 'draft-js'

const RichEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    console.log(editorState)
  }, [editorState])
  return <Editor editorState={editorState} onChange={setEditorState} />
}

export default RichEditor
