import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import error from './error';

import Telescope from '../lib/en_US';
const messages = Telescope.strings['en'] || {};

const rootReducer = combineReducers({
    error,
    posts: require('./posts'),
    topics: require('./topics'),
    routing: routerReducer,
    popModel: require('./popModel'),
    user: require('./user'),
    auth: require('./auth/authReducer')
});

export default rootReducer;
