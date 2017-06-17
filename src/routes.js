let Telescope = require('./components/lib/index').default

import CoreLayout from './layouts/PageLayout/PageLayout'

import Home from './routes/Home'

export function requireAuth (store) {
  return (nextState, replace) => {

    const state = store.getState()

    if (!state.auth.isLoggedIn) {
      replace({
        pathname: '/login',
        query: {
          next: nextState.location.pathname
        }
      })
    }

  }
}

const createRoutes = (store) => {
  const routes = [
    {
      path: '/',
      component: Telescope.components.Layout,
      indexRoute: Telescope.components.PostsHome,

      childRoutes: [
        {
          // http://localhost:3000/from/thehindu.com
          path: 'from/:domain',
          component: Telescope.components.PostsHome,
        },
        {
          path: 'dashboard',
          component: Telescope.components.PostsHome,
          onEnter: requireAuth(store)
        },
        {
          path: 'signup',
          component: Telescope.components.PostsHome
        },
        {
          path: '*',
          component: Telescope.components.Error404
        }
      ]
    }
  ]

  return routes[0]
}

export default createRoutes
