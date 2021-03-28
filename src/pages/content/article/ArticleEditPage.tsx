import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import FormRenderer, { FieldConfig } from 'src/components/form/FormRenderer'
import useToast from 'src/contexts/toast/toast.context'
import { service, useSubmit } from 'src/services'
import { CreateArticleDto } from 'src/services/api'

const form: Required<CreateArticleDto> = {
  title: '',
  tags: [],
  content: '',
}

const formConfig: FieldConfig<keyof typeof form>[] = [
  { type: 'input', name: 'title', label: 'Title', required: true },
  {
    type: 'select',
    name: 'tags',
    label: 'Tags',
    multiple: true,
    options: [],
    creatable: true,
    onAddItem: async ({ text, value }) => {
      const { data: tag } = await service.tag.createTag({ key: String(value), name: String(text) })
      return { text: tag.name, value: tag.key, description: tag.description }
    },
  },
  { type: 'rich', name: 'content', label: 'Content' },
]

const ArticleEditPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const isCreate = id === 'create'

  const { formRef, submitting, submitRequest } = useSubmit(service.article.createArticle)

  const onSubmit = async (form: CreateArticleDto) => {
    try {
      await submitRequest(form)
      toast.success('Success')
      navigate('..')
    } catch (e) {
      // TODO: error handling
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
