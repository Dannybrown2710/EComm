import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import global from './global'
import user from './user'
import product from './products'
import event from './events'
import api from './api'

export default combineReducers({
  routing: routerReducer,
  global,
  product,
  api,
  event,
  user
})
