import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { IntlProvider } from 'react-intl'

var Parse = require('parse')

Parse.initialize('CwsmGkrIp6SHBB7ERFVQatRwwNyOL7ep0L5DT7rb', 'QpOB4AmY1aPtAiX7tXlTSO4RUubMkysANzaD7lHf')

Parse.serverURL = 'https://parseapi.back4app.com/'

var Telescope = require('../lib/en_US').default

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <IntlProvider locale='en' messages={Telescope.strings.en}>
          <div style={{height: '100%'}}>
            <Router history={browserHistory} children={this.props.routes}/>
          </div>
        </IntlProvider>
      </Provider>
    )
  }
}

export default App
