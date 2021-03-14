import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import FormRenderer, { FieldConfig } from 'src/components/FormRenderer'

const ArticleEditPage: React.FC = () => {
  const { id } = useParams()
  // TODO: Create article feature
  const isCreate = id === 'create'
  const navigate = useNavigate()

  const form = {
    title: '',
    content: '',
  }

  const formConfig: FieldConfig<keyof typeof form>[] = [
    { type: 'input', name: 'title', label: 'Title' },
    { type: 'rich', name: 'content', label: 'Content' },
  ]

  return <div>
    <Menu attached='top'>
      <Menu.Item role='link' icon='angle left' content='Back' onClick={() => navigate(-1)} />
    </Menu>
    <Segment attached='bottom'>
      <FormRenderer initForm={form} fields={formConfig} />
    </Segment>
  </div>
}

export default ArticleEditPage
