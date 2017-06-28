const Parse = require('parse')

let Parameters = require('../parameters').default

let {ParsePost, ParseFolder, ParseUser} = require('./objects').default


function getQueryByType(type: string = 'POSTS') {
  switch (type) {
    case 'POSTS':
      return new Parse.Query(ParsePost).include('topics').include('postAuthor')
    case 'USERS':
      return new Parse.Query(ParseUser)
  }

}

function getPostsParameters(terms) {
  return new Parameters.Posts(getQueryByType())
    .addParameters(terms)
    .end()
}

function getUsersParameters(terms) {
  return new Parameters.Users(getQueryByType('USERS'))
    .addParameters(terms)
    .end()
}

export default {
  getQueryByType,
  getPostsParameters,
  getUsersParameters
}
