import React from 'react'

import t from 'tcomb-form'

const FormSchema = t.struct({
  name: t.String,         // a required string
  age: t.maybe(t.Number), // an optional number
  rememberMe: t.Boolean   // a boolean
})

class TComb extends React.Component {

  onSubmit(evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue()
    if (value) {
      console.log(value)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <t.form.Form ref="form" type={FormSchema}/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }

}

export default TComb

