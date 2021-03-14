export const CREATE = 'create'

export const routePath = {
  root: '/',
  login: '/login',
  notFound: '/404',
  appMatcher: '/:app(dashboard|content)',
  moduleMatcher: '/:app(dashboard|content)/:module?/:id?',
  dashboard: '/dashboard',

  content: {
    root: '/content',
    matcher: `/content/:module(article|category|tag|page|guestbook|comment)/:id(\\d+|${CREATE})?`,
    article: '/content/article',
    category: '/content/category',
    tag: '/content/tag',
    page: '/content/page',
    guestbook: '/content/guestbook',
    comment: '/content/comment',
  } as Record<string, string>,
}

export const routeMap = {
  app: (appKey: string) => `/${appKey}`,
  module: (appKey: string, module: string) => `/${appKey}/${module}`,
  moduleEdit: (appKey: string, module: string, id: number | string) => `/${appKey}/${module}/${id}`,
}
