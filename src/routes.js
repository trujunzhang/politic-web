let Telescope = require('./components/lib').default

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
      indexRoute: {component: Telescope.components.PostsHome},

      childRoutes: [
        {
          // http://localhost:3000/from/thehindu.com
          path: 'from/(:domain)',
          component: Telescope.components.PostsHome,
        },
        {
          // http://localhost:3000/post/GLp0BQ8hJD
          path: 'post/(:id)',
          component: Telescope.components.PostsHome,
        },
        {
          // http://localhost:3000/article/new
          path: 'article/new',
          component: Telescope.components.SubmitAnArticle,
        },
        {
          // http://localhost:3000/management
          path: 'management',
          component: Telescope.components.AppAdminLayout,
          indexRoute: {component: Telescope.components.AppAdminDashboard},
          childRoutes: [
            {
              // http://localhost:3000/management/posts
              path: 'posts',
              component: Telescope.components.AppAdminPostsList,
            }
          ]
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
