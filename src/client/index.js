import React from 'react'
import ReactDOM from 'react-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './containers/App'
import reportWebVitals from '../reportWebVitals'
import './assets/styles/reset.scss'

let history = createBrowserHistory()

ReactDOM.hydrate(
  <Router history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
