import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Menu, Table } from 'semantic-ui-react'
import ListWrapper from 'src/components/ListWrapper'
import { CREATE, routeMap } from 'src/routeConfig'
import { API } from 'src/services'
import { formatDateTime } from 'src/utils/format.util'
import { curry } from 'lodash'

const ArticleListPage: React.FC = () => {
  const {
    loading,
    error,
    pageMeta,
    items: articles,
    retrieveList,
  } = API.article.retrieveArticles.useRetrieveList<defs.ArticleEntity>()

  const navigateEdit = curry(routeMap.moduleEdit)('content', 'article')

  return <div>
    <Menu attached='top'>
      <Menu.Item icon='plus' content='New' as={Link} to={navigateEdit(CREATE)} />
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input icon='search' type='search' placeholder='Search' transparent />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <ListWrapper loading={loading} pageMeta={pageMeta} error={error} onRetrieve={retrieveList}>
      <Table attached striped singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Created at</Table.HeaderCell>
            <Table.HeaderCell>Updated at</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {articles.map(article => <Table.Row key={article.id} draggable>
            <Table.Cell>{article.id}</Table.Cell>
            <Table.Cell>{article.title}</Table.Cell>
            <Table.Cell>{formatDateTime(article.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateTime(article.updatedAt)}</Table.Cell>
            <Table.Cell>
              <Button basic icon='edit' as={Link} to={navigateEdit(article.id)} />
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    </ListWrapper>
  </div>
}

export default ArticleListPage
