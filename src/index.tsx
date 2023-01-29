import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import App from 'src/App'
import 'src/assets/css/index.scss'
import { AuthorizationProvider } from 'src/contexts/authorization/authorization.context'
import { ToastProvider } from 'src/contexts/toast/toast.context'
import * as serviceWorker from 'src/serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider>
      <AuthorizationProvider>
        <App />
      </AuthorizationProvider>
    </ToastProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
