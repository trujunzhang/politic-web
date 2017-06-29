import React, {Component} from 'react'

const {dismissPopModel} = require('../../../../actions').default

class UserLoginLayout extends Component {

  onClosePress(e) {
    e.preventDefault()

    this.props.dispatch(dismissPopModel())
  }

  renderCloseIcon() {
    return (
      <a className='modal--close v-desktop' onClick={this.onClosePress.bind(this)} title='Close'>
        <span>
          <svg width='12' height='12' viewBox='0 0 12 12'>
            <path
              d='M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z'/>
          </svg>
        </span>
      </a>
    )
  }

  render() {
    const {title, showCloseIcon, child, formState} = this.props
    const intro = 'Politicl is a news platform that brings together high quality news from across India. '
    return (
      <div className='modal-overlay v-fullscreen' id='popover_for_loginui'>
        <div className='modal--content'>
          <div className={'login-fullscreen ' + formState}>
            <h2 className='login-fullscreen--title'>
              {title}
            </h2>
            <p className='login-fullscreen--intro'>{intro}</p>
            {child}
          </div>
        </div>

        {showCloseIcon ? this.renderCloseIcon() : null}

      </div>
    )
  }
}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

export default connect()(UserLoginLayout)
