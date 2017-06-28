import React from 'react'


class SendEmails extends React.Component {

  onSubmit() {
    debugger
  }

  render() {
    return (
      <div className="placeholder_1WOC3">
        <div >
          <h4>Send an email</h4>
          <div className="form-group">
            <button type="submit"
                    onClick={this.onSubmit.bind(this)}
                    className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }

}

export default SendEmails

