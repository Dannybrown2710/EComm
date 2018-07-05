import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './Containers/App.js'
import registerServiceWorker from './registerServiceWorker';
import {login,loadAllUsers} from './modules/user';
import 'font-awesome/css/font-awesome.min.css';
import './index.css'
import {logger} from './resources/';
//logger.disableLogger();

//store.dispatch(loadAllUsers());

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker();
