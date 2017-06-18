import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import promise from './promise'
import { updateLocation } from './location'
import { persistStore, autoRehydrate } from 'redux-persist'

// Logger with default options
import logger from 'redux-logger'

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promise, logger]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [autoRehydrate()]// add `autoRehydrate` as an enhancer to your store (note: `autoRehydrate` is not a middleware)
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  // begin periodically persisting the store
  persistStore(store, {whitelist: ['user']}, () => {
    console.log('rehydration complete')
  })

  return store
}

export default createStore
