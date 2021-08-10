
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../components/App'
import store from '../redux/store/index';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
    <Router>
      <Route path='/' component={App}/>
      </Router>
    </Provider>
,
    document.body.appendChild(document.createElement('div')),
  )
})
