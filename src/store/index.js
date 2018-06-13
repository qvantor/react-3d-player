import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

export const store = createStore(rootReducer, enhancer)
