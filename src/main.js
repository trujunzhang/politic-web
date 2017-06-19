import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

history.listen((location) => {
  window.scrollTo(0, 0)

// debugger
  // analyticsService.track(location.pathname)
})

const {popModel} = require('./actions').default

/**
 * Callback function handling frontend route changes.
 * https://github.com/reactGo/reactGo/blob/master/app/client.jsx
 */
function onUpdate () {
  store.dispatch(popModel())
}

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes').default(store)

  ReactDOM.render(
    <App store={store} routes={routes} history={history} onUpdate={onUpdate}/>,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
        './components/App',
        './routes',
      ], () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
