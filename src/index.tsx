import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { AuthorizationProvider } from 'src/contexts/authorization/authorization.context'
import * as serviceWorker from 'src/serviceWorker'

import 'semantic-ui-css/semantic.min.css'
import 'draft-js/dist/Draft.css'
import 'src/assets/css/index.scss'

ReactDOM.render(
  <BrowserRouter>
    <AuthorizationProvider>
      <App />
    </AuthorizationProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
