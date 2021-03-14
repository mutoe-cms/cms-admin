import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { CREATE } from 'src/routeConfig'
import FormRenderer, { FieldConfig } from 'src/components/FormRenderer'

const ArticleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  // TODO: Create article feature
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isCreate = id === CREATE
  const history = useHistory()

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
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Menu.Item role='link' icon='angle left' content='Back' onClick={history.goBack} />
    </Menu>
    <Segment attached='bottom'>
      <FormRenderer initForm={form} fields={formConfig} />
    </Segment>
  </div>
}

export default ArticleEditPage
