import React, {Component} from 'react'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'

const {loadUserFolders} = require('../../../../actions').default

class CollectionsResult extends Component {

  componentDidMount() {
    // const nextListTask = this.state.listTask
    // nextListTask['ready'] = false
    // this.setState({listTask: nextListTask})
    // this.props.dispatch(loadUserFolders(nextListTask, this.props.listId, this.props.terms))
  }

  render() {
    const {currentUser, onCollectedItemClick, savedPostId} = this.props,
      {folders} = currentUser

    const existInFolder = (
      <span className="checkmark_e76b7">
          <svg width="14" height="11" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.178 10.33L.308 6.51c-.45-.445-.407-1.194.135-1.578.424-.304 1.02-.216 1.39.15L4.18 7.4c.23.224.603.224.83 0l6.283-6.195c.37-.366.965-.455 1.39-.153.542.384.587 1.133.135 1.578l-7.805 7.695c-.232.227-.604.227-.837 0l.002.002z"
                fill="#4DC667"/>
          </svg>
      </span>
    )

    const lockIcon = (<span className="collections-popover--collection--icon v-collect folder-visible fa fa-lock"/>)

    const foldersList = folders.map((folder, index) => {
      let postExist = Users.checkArticleInFolder(savedPostId, folder)
      return (
        <li key={folder.id}>
          <a onClick={(e) => {
            onCollectedItemClick(folder, postExist)
          }}
             className="collections-popover--collection popover--scrollable-list--element">
            {folder.name}
            {postExist ? existInFolder : null}
            {folder.visible === 'Lock' ? lockIcon : null}
          </a>
        </li>
      )
    })

    const loading = (
      <div className="placeholder_folder">
        <div className="loader_54XfI animationRotate loader_OEQVm"/>
      </div>
    )

    return (
      <ul className="collections-popover--collections popover--scrollable-list">
        {foldersList}
      </ul>
    )
  }

}

/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')


/**
 * Connect the properties
 */

export default connect()(CollectionsResult)

