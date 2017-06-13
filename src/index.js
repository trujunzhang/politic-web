import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore';
import createRoutes from './routes';

import {IntlProvider, intlReducer} from 'react-intl-redux'

var Parse = require('parse');

Parse.initialize('CwsmGkrIp6SHBB7ERFVQatRwwNyOL7ep0L5DT7rb', 'QpOB4AmY1aPtAiX7tXlTSO4RUubMkysANzaD7lHf');

Parse.serverURL = 'https://parseapi.back4app.com/';

import './index.css';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
            <Router routes={routes} history={history}/>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);
