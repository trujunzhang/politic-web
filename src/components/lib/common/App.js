import React, {Component} from 'react';
import {Link} from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><code>Create React App Parse Redux App</code></h1>
          <p>A somewhat hecomponents/fty boiler plate using create-react-app with a Parse backend</p>
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        {this.props.children}
        <footer>
          <p><a href="https://github.com/zebapy/create-react-app-parse-redux">View on GitHub</a></p>
          <h1>{this.state.name}</h1>
          <div>
            <button
              onClick={this.onSaveGameHandler.bind(this)}
            >save game
            </button>
          </div>
        </footer>
      </div>
    );
  }

  onSaveGameHandler() {
    // this.setState({name: "game"});
    //
    // const {dispatch} = this.props;
    // try {
    //     dispatch(clientRequestAShipment());
    // } catch (e) {
    //     const message = e.message || e;
    //     if (message !== 'Timed out' && message !== 'Canceled by user') {
    //         console.warn(e);
    //     }
    // } finally {
    // }
  }
}


/**
 * Connect the properties
 */
export default App;
