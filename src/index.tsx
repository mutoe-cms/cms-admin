import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import * as ReactDOM from 'react-dom/client'
import App from 'src/App'
import { AuthorizationProvider } from 'src/contexts/authorization/authorization.context'
import { ToastProvider } from 'src/contexts/toast/toast.context'
import * as serviceWorker from 'src/serviceWorker'

import 'semantic-ui-css/semantic.min.css'
import 'src/assets/css/index.scss'

ReactDOM
  .createRoot(document.querySelector('#root') as HTMLElement)
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <ToastProvider>
          <AuthorizationProvider>
            <App />
          </AuthorizationProvider>
        </ToastProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
