import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'
import {withRouter} from 'react-router';


const FoldersList = ({
                       results,
                       user,
                       hasMore,
                       ready = true,
                       count,
                       totalCount,
                       loadMore,
                       title,
                       emptyHint,
                     }, context) => {
  return (
    <div>
      <div className="paddedBox_2UY-S box_c4OJj">
        <Telescope.components.PostsListTitle title={title}/>
        <div className="content_DcBqe">
          {ready ? (
            (results.length > 0 ?
                <div className="grid_hjrL6">
                  {results.map((folder, index) => {
                    return (
                      <Telescope.components.FoldersItem key={index} folder={folder} user={user}/>)
                  })}
                </div> :
                <div className="placeholder_lYzpv">
                  <span className="emoji_1lBv0">📂</span>
                  <span className="text_3Wjo0 subtle_1BWOT base_3CbW2">{emptyHint}</span>
                </div>
            )) :
            (<section className="results_37tfm">
              <Telescope.components.PostsLoading id="load.more.hint.posts"/>
            </section>)}
        </div>
      </div>
    </div>
  )
};

export default FoldersList
