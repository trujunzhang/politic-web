import Home from './components/Home';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';

import Telescope from './components/lib/index';

export function requireAuth(store) {
    return (nextState, replace) => {

        const state = store.getState();

        if (!state.auth.isLoggedIn) {
            replace({
                pathname: '/login',
                query: {
                    next: nextState.location.pathname
                }
            });
        }

    };
}

const createRoutes = (store) => {

    const routes = [
        {
            path: '/',
            component: Telescope.components.Layout,
            indexRoute: {
                component: Telescope.components.PostsHome
            },
            childRoutes: [
                {
                    path: 'dashboard',
                    component: DashboardContainer,
                    onEnter: requireAuth(store)
                },
                {
                    path: 'signup',
                    component: SignupContainer
                },
                {
                    path: 'login',
                    component: LoginContainer
                },
                {
                    path: '*',
                    component: Telescope.components.Error404
                }
            ]
        }
    ];

    return routes;
}

export default createRoutes;
