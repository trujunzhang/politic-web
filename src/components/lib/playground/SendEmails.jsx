import React from 'react'


// const {timeout, sendEmail} = require('../../../actions').default

class SendEmails extends React.Component {
  async onButtonPress() {
    // debugger
    //   const {dispatch} = this.props
    //
    //   try {
    //     await Promise.race([
    //       dispatch(sendEmail('djzhang', 'password')),
    //       timeout(15000),
    //     ])
    //   } catch (e) {
    //     this.props.actions.loginFailure(e)
    //     const message = e.message || e
    //     if (message !== 'Timed out' && message !== 'Canceled by user') {
    //       alert(message);
    //       console.warn(e);
    //     }
    //   } finally {
    //   }
  }


  render() {
    return (
      <div className="placeholder_1WOC3">
        <div >
          <h4>Send an email</h4>
          <div className="form-group">
            <button type="submit"
                    onClick={this.onButtonPress.bind(this)}
                    className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }

}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

export default connect()(SendEmails)

