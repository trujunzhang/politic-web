const Parse = require('parse')
import moment from 'moment'

let {ParsePost, ParseFolder, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {
  USERPROFILE_TYPE_UPVOTE,
  USERPROFILE_TYPE_DOWNVOTE,
  USERPROFILE_TYPE_SUBMITTED_POSTS,
  USERPROFILE_TYPE_FOLDER_LIST
} = require('../lib/constants').default

export default class TopicsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {


    if (terms.related) { // related posts
      // this.query.notContainedIn('objectId', terms.related.id)
      // this.query.equalTo('author', terms.related.author)
    }


    return this
  }

  end() {
    return this.query
  }

}


