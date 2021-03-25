import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import FormRenderer, { FieldConfig } from 'src/components/FormRenderer'

const form = {
  title: '',
  content: '',
}

const formConfig: FieldConfig<keyof typeof form>[] = [
  { type: 'input', name: 'title', label: 'Title' },
  { type: 'rich', name: 'content', label: 'Content' },
]

const ArticleEditPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const isCreate = id === 'create'

  return <>
    <Menu attached='top'>
      <Menu.Item role='link' icon='angle left' content='Back' onClick={() => navigate(-1)} />
    </Menu>

    <Segment attached='bottom'>
      <Header as="h2" >
        <Icon name="edit" />
        <Header.Content>
          {isCreate ? 'Create ' : 'Edit '}
          Article
        </Header.Content>
      </Header>

      <FormRenderer initForm={form} fields={formConfig} />
    </Segment>
  </>
}

export default ArticleEditPage
