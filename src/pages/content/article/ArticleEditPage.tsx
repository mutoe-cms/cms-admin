import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import FormRenderer, { FieldConfig } from 'src/components/form/FormRenderer'
import { service, useSubmit } from 'src/services'
import { CreateArticleDto } from 'src/services/api'

const form: CreateArticleDto = {
  title: '',
  tags: [],
  content: '',
}

const formConfig: FieldConfig<keyof typeof form>[] = [
  { type: 'input', name: 'title', label: 'Title', required: true },
  { type: 'select', name: 'tags', label: 'Tags', multiple: true, options: [] },
  { type: 'rich', name: 'content', label: 'Content' },
]

const ArticleEditPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const isCreate = id === 'create'

  const { formRef, submitting, submitRequest } = useSubmit(service.article.createArticle)

  const onSubmit = async (form: CreateArticleDto) => {
    try {
      await submitRequest(form)
      // TODO: success handling
    } catch (e) {
      // TODO: error handling
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

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

      <FormRenderer
        ref={formRef}
        initForm={form}
        fields={formConfig}
        submitting={submitting}
        onSubmit={onSubmit}
      />
    </Segment>
  </>
}

export default ArticleEditPage
