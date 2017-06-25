import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'


const {loadPosts} = require('../../../../actions').default
const {byListId} = require('../../../filter/filterPosts').default

class UserProfilePostsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listTask: byListId(props.listContainerTasks, props.listId, props.limit)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, nextProps.listId, nextProps.limit)
    })
  }

  componentDidMount() {
    // console.log('@ Posts List did Mount!')
    this.loadMore()
  }

  loadMore() {
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadPosts(nextListTask, this.props.listId, this.props.terms))
  }

  render() {

    const {
      showHeader = false,
      title,
      showClose = false,
      canEdit = false,
      emptyHint = '',
      user,
      listId
    } = this.props

    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
      limit,
      firstPagination,
    } = listTask

    let hasMore = !ready && totalCount !== results.length

    if (!!results.length) {
      return (

        <div>
          <div className="fullWidthBox_3Dggh box_c4OJj">
            <div className="content_DcBqe">
              <Telescope.components.PostsListTitle title={title}/>
              <div >
                <ul className="postsList_3n2Ck">
                  {results.map((post, index) => {
                      if (Posts.isRemovedPost(post)) {
                        return (
                          <Telescope.components.PostsDeletedItem
                            key={post.id}
                            post={post}
                            user={user}
                          />
                        )
                      } else {
                        let _canEdit = canEdit && (post.status === Posts.config.STATUS_APPROVED);
                        return (
                          <Telescope.components.PostsItem
                            listId={listId}
                            key={post.id}
                            post={post}
                            user={user}
                            type={"save"}
                            canEdit={_canEdit}/>
                        )
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
            {hasMore ? (ready ?
              <Telescope.components.PostsLoadMore loadMore={this.loadMore.bind(this)}/> : null) : null}
          </div>
          {hasMore ? (ready ? null : <Telescope.components.PostsLoading id={"load.more.hint.posts"}/>) : null}
        </div>
      )
    } else if (!ready) {
      return (
        <section className="results_37tfm">
          <div>
            <div className="fullWidthBox_3Dggh box_c4OJj">
              <div className="content_DcBqe">
                <Telescope.components.PostsListTitle title={title}/>
              </div>
            </div>
          </div>
          <Telescope.components.PostsLoading id={"load.more.hint.posts"}/>
        </section>
      )
    } else {
      return (
        <section className="results_37tfm">
          <div>
            <div className="fullWidthBox_3Dggh box_c4OJj">
              <div className="content_DcBqe">
                <Telescope.components.PostsListTitle title={title}/>
                <div className="content_DcBqe">
                  <div className="placeholder_lYzpv">
                    <span className="text_3Wjo0 subtle_1BWOT base_3CbW2">{emptyHint}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }


  }

}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')


function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

/**
 * Connect the properties
 */
export default connect(select)(UserProfilePostsList)

