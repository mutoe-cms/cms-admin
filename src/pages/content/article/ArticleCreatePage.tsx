import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import FormRenderer from 'src/components/form/FormRenderer'
import useToast from 'src/contexts/toast/toast.context'
import { articleForm, articleFormConfig } from 'src/pages/content/article/articleForm.config'
import { service, useSubmit } from 'src/services'
import { CreateArticleDto } from 'src/services/api'

const ArticleCreatePage: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const { formRef, submitting, submitRequest } = useSubmit(service.article.createArticle)

  const onSubmit = async (form: CreateArticleDto) => {
    try {
      await submitRequest(form)
      toast.success('Success')
      navigate('..')
    } catch {
      // TODO: error handling
    }
  }

  return <>
    <Menu attached='top'>
      <Menu.Item role='link' icon='angle left' content='Back' onClick={() => navigate(-1)} />
    </Menu>

    <Segment attached='bottom'>
      <Header as='h2' >
        <Icon name='edit' />
        <Header.Content>Create Article</Header.Content>
      </Header>

      <FormRenderer
        ref={formRef}
        initForm={articleForm}
        fields={articleFormConfig}
        submitting={submitting}
        onSubmit={onSubmit}
      />
    </Segment>
  </>
}

export default ArticleCreatePage
