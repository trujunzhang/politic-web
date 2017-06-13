import React from 'react';
import {FormattedMessage, intlShape} from 'react-intl';

const PostsLoading = ({id}) => {
    return (
        <div className="post_loading_same_height_as_load_more">
          <span className="loading_2hQxH featured_2W7jd subtle_1BWOT base_3CbW2">
              <div className={"post-loadmore-spinner"}>
                  <span>
                      <FormattedMessage id={id}/>
                      </span>
                  <div className="bounce1"/>
                  <div className="bounce2"/>
                  <div className="bounce3"/>
              </div>
          </span>
        </div>
    )
};

PostsLoading.displayName = "PostsLoading";

module.exports = PostsLoading;