import React from 'react'


class SendEmails extends React.Component {

  onSubmit() {
    debugger
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }

}

export default SendEmails

