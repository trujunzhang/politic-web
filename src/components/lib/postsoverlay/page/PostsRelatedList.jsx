import Telescope from '../../../../lib'
import React, { Component } from 'react'

class PostsRelatedList extends Component {

  render () {
    const ready = false

    if (ready && !!results.length) {
      return (
        <div>
          {results.map(post =>
            <Telescope.components.PostsRelatedItem key={post._id} post={post} currentUser={currentUser}/>
          )}
        </div>
      )
    } else if (!ready) {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsLoading id='load.more.hint.posts'/>
        </section>
      )
    } else {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsNoResults relatedList={true}/>
        </section>
      )
    }
  }
}

export default PostsRelatedList
