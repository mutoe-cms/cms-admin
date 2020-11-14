import { SemanticICONS } from 'semantic-ui-react'

export type AppKey = 'dashboard' | 'content'

export interface AppMenu {
  key: AppKey
  appName: string
  icon: SemanticICONS
  modules?: ModuleMenu[]
}

export interface ModuleMenu {
  moduleName: string
  items: MenuItem[]
}

interface MenuItem {
  key: string
  name: string
  icon: SemanticICONS
}

export const appMenus: AppMenu[] = [
  {
    key: 'dashboard',
    appName: 'Dashboard',
    icon: 'dashboard',
  },

  {
    key: 'content',
    appName: 'Content',
    icon: 'newspaper',
    modules: [
      {
        moduleName: 'Content Management',
        items: [
          {
            key: 'article',
            name: 'Articles',
            icon: 'paper plane',
          },
          {
            key: 'category',
            name: 'Categories',
            icon: 'grid layout',
          },
          {
            key: 'tag',
            name: 'Tags',
            icon: 'tags',
          },
          {
            key: 'page',
            name: 'Pages',
            icon: 'newspaper',
          },
        ],
      },
      {
        moduleName: 'Content Approval',
        items: [
          {
            key: 'message-board',
            name: 'Message board',
            icon: 'facebook messenger',
          },
          {
            key: 'comment',
            name: 'Comments',
            icon: 'comments',
          },
        ],
      },
    ],
  },
]

