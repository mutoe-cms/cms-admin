import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

const ArticleListPage = React.lazy(() => import(/* webpackChunkName: "content" */'src/pages/content/article/ArticleListPage'))
const ArticleEditPage = React.lazy(() => import(/* webpackChunkName: "content" */'src/pages/content/article/ArticleEditPage'))

type ModuleKey = 'article'

const componentMap: Record<ModuleKey, Record<'list' | 'edit', React.LazyExoticComponent<React.FC>>> = {
  article: { list: ArticleListPage, edit: ArticleEditPage },
}

const ContentPage: React.FC = () => {
  const { module: moduleKey, id } = useParams<{ module: ModuleKey; id: string }>()

  const Component = componentMap[moduleKey]?.[id ? 'edit' : 'list'] || React.Fragment

  return <div className='ContentPage'>
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </div>
}

export default ContentPage
