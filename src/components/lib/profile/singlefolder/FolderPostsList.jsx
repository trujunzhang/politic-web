import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'


const FolderPostsList = ({results, limit, hasMore, ready, count, totalCount, loadMore, folder}, context) => {

  const postIds = folder.posts;
  if (!!results.length) {
    const posts = results.map((post, index) => {
        if (Posts.isRemovedPost(post)) {
          return (
            <Telescope.components.PostsDeletedItem
              key={post._id}
              post={post}
              user={folder.folderUser}
              folder={folder}/>
          )
        } else {
          return (
            <Telescope.components.PostsItem
              key={post._id}
              post={post}
              user={folder.folderUser}
              type={(postIds.indexOf(post._id) === -1) ? "save" : "remove"}
              folder={folder}
              canEdit={false}/>
          )
        }
      }
    );

    return (
      <Telescope.components.InfiniteScroll
        hasMore={hasMore}
        currentPage={results.length / limit}
        loadMore={loadMore}>
        <div>
          <div className="fullWidthBox_3Dggh box_c4OJj">
            <div className="content_DcBqe">
              <div >
                <ul className="postsList_3n2Ck">
                  {posts}
                </ul>
              </div>
            </div>
            {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore}/> : null) : null}
          </div>
          {hasMore ? (ready ? null : <Telescope.components.PostsLoading id={"load.more.hint.posts"}/>) : null}
        </div>
      </Telescope.components.InfiniteScroll>
    )
  } else if (!ready) {
    return (
      <section className="results_37tfm">
        <Telescope.components.PostsLoading id={"load.more.hint.posts"}/>
      </section>
    )
  } else {
    return (
      <section className="results_37tfm">
        <div className="content_DcBqe">
          <div className="placeholder_lYzpv">
            <span className="text_3Wjo0 subtle_1BWOT base_3CbW2">No posts collected yet.</span>
          </div>
        </div>
      </section>
    )
  }
};

export default FolderPostsList;
