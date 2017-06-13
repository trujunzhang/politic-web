import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import error from './error';

const rootReducer = combineReducers({
  auth,
    error,
    shippingTasks: require('./shippingTasks'),
    shipments: require('./shipments'),
    routing: routerReducer
});

export default rootReducer;
