let Telescope = require('./components/lib').default

import CoreLayout from './layouts/PageLayout/PageLayout'

import Home from './routes/Home'

export function requireAuth(store) {
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
          // http://localhost:3000/playground
          path: 'playground',
          component: Telescope.components.TComb,
        },
        {
          // http://localhost:3000/users/my/edit
          path: 'users/my/edit',
          component: Telescope.components.UsersEdit,
        },
        {
          // http://localhost:3000/users/zhang-trujun
          path: 'users/(:uid)/(:uslug)',
          component: Telescope.components.UsersSingle,
          indexRoute: {component: Telescope.components.UsersUpvote},
          childRoutes: [
            {
              // http://localhost:3000/users/zhang-trujun/downvotes
              path: 'downvotes',
              component: Telescope.components.UsersDownvote,
            },
            {
              // http://localhost:3000/users/zhang-trujun/posts
              path: 'posts',
              component: Telescope.components.UsersSubmittedPostsList,
            },
            {
              // http://localhost:3000/users/zhang-trujun/collections
              path: 'collections',
              component: Telescope.components.UsersCollectionFoldersList,
            },
            {
              // http://localhost:3000/users/zhang-trujun/collections/
              path: 'collections/(:fid)/(:fslug)',
              component: Telescope.components.UsersFolderProfile,
            }
          ]
        },
        {
          // http://localhost:3000/topic/lead
          path: 'topic/(:topicId)/(:title)',
          component: Telescope.components.PostsHome,
        },
        {
          // http://localhost:3000/from/thehindu.com
          path: 'from/(:domain)',
          component: Telescope.components.PostsHome,
        },
        {
          // http://localhost:3000/post/cDJao7Bw3P
          path: '/post/(:id)',
          component: Telescope.components.PopoverPosts,
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
