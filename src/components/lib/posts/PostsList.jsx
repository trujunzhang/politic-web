import Telescope from '../index'
import React, { Component } from 'react'
import Posts from '../../../lib/posts'

const {loadPosts} = require('../../../actions').default
const {byListId} = require('../../filter/filterPosts').default

class PostsList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      listTask: byListId(props.listContainerTasks, props.listId, props.limit)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, nextProps.listId, nextProps.limit)
    })
  }

  componentDidMount () {
    this.loadMore()
  }

  loadMore () {
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadPosts(nextListTask, this.props.listId, this.props.terms))
  }

  render () {
    const {
      showHeader = false,
      title,
      showClose = false,
      infinite = false,
      dismissBanner = null
    } = this.props

    const {listTask} = this.state

    const {
      results,
      hasMore,
      ready,
      totalCount,
      limit,
      firstPagination,
    } = listTask

    // debugger

    const showReady = Posts.showReady(results, hasMore, ready, totalCount, limit, firstPagination)
    const headerView =
      (<div>
        <div className='fullWidthBox_3Dggh box_c4OJj'>
          <div className='content_DcBqe'>
            <Telescope.components.PostsListTitle
              title={title}
              showClose={showClose}
              dismissBanner={dismissBanner}/>
          </div>
        </div>
      </div>)

    if (showReady) {
      return (
        <section className='results_37tfm'>
          {showHeader ? headerView : null}
          <Telescope.components.PostsLoading id={'load.more.hint.posts'}/>
        </section>
      )
    } else {
      return (
        <Telescope.components.PostsHomeList
          infinite={infinite}
          results={results}
          limit={limit}
          hasMore={hasMore}
          ready={ready} title={title}
          showClose={showClose}
          showHeader={showHeader}
          dismissBanner={dismissBanner}
          loadMore={this.loadMore.bind(this)}/>
      )
    }

  }

}

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

function select (store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

/**
 * Connect the properties
 */

export default connect(select)(PostsList)

