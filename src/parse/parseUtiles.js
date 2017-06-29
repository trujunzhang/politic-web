const Parse = require('parse')

let Parameters = require('../parameters').default

let {ParsePost, ParseFolder, ParseUser} = require('./objects').default


/**
 * The states were interested in
 */
const {
  PARSE_USERS,
  PARSE_TOPICS,
  PARSE_POSTS,
  PARSE_COMMENTS,
} = require('../lib/constants').default

function getQueryByType(type: string = PARSE_POSTS) {
  switch (type) {
    case PARSE_POSTS:
      return new Parse.Query(ParsePost).include('topics').include('postAuthor')
    case PARSE_USERS:
      return new Parse.Query(ParseUser)
  }

}

function getPostsParameters(terms) {
  return new Parameters.Posts(getQueryByType())
    .addParameters(terms)
    .end()
}

function getUsersParameters(terms) {
  return new Parameters.Users(getQueryByType(PARSE_USERS))
    .addParameters(terms)
    .end()
}

function getTopicsParameters(terms) {
  return new Parameters.Topics(getQueryByType(PARSE_TOPICS))
    .addParameters(terms)
    .end()
}

export default {
  getQueryByType,
  getPostsParameters,
  getUsersParameters,
  getTopicsParameters
}
