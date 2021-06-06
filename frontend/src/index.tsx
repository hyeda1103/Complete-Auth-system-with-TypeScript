import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import rootReducer from './modules'
import App from './App'

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(`${localStorage.getItem('userInfo')}`) : null

const initialState = {
  signIn: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
