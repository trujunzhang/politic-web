import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import auth from './auth';
import error from './error';

import {Provider, intlReducer} from 'react-intl-redux'

const rootReducer = combineReducers({
    auth,
    error,
    posts: require('./posts'),
    topics: require('./topics'),
    routing: routerReducer,
    intl: intlReducer,
});

export default rootReducer;
