import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore';
import createRoutes from './routes';
import {IntlProvider, addLocaleData} from 'react-intl' ;

var Parse = require('parse');

Parse.initialize('CwsmGkrIp6SHBB7ERFVQatRwwNyOL7ep0L5DT7rb', 'QpOB4AmY1aPtAiX7tXlTSO4RUubMkysANzaD7lHf');

Parse.serverURL = 'https://parseapi.back4app.com/';

import './main.css';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

import Telescope from './lib/en_US';

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale="en" messages={Telescope.strings.en}>
            <Router routes={routes} history={history}/>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);
