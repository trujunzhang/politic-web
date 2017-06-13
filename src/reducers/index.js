import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import auth from './auth';
import error from './error';

import Telescope from '../lib/en_US';
const messages = Telescope.strings['en'] || {};

const rootReducer = combineReducers({
    auth,
    error,
    posts: require('./posts'),
    topics: require('./topics'),
    routing: routerReducer
});

export default rootReducer;
