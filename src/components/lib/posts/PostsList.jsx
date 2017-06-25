import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'

const {loadPosts} = require('../../../actions').default
const {byListId} = require('../../filter/filterPosts').default

class PostsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listTask: byListId(props.listContainerTasks, props.listId, props.limit)
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger
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
      listId,
      showHeader = false,
      title,
      showClose = false,
      infinite = false,
      dismissBanner = null
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
    } else if (!!results && !!results.length) {
      return (
        <Telescope.components.PostsHomeList
          infinite={infinite}
          results={results}
          limit={limit}
          hasMore={hasMore}
          ready={ready}
          title={title}
          listId={listId}
          showClose={showClose}
          showHeader={showHeader}
          dismissBanner={dismissBanner}
          loadMore={this.loadMore.bind(this)}/>
      )
    } else {
      return (
        <section className="results_37tfm">
          {showHeader ? headerView : null}
          <Telescope.components.PostsNoResults relatedList={false}/>
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

export default connect(select)(PostsList)

