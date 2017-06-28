const Parse = require('parse')

let Parameters = require('../parameters').default

let {ParsePost, ParseFolder, ParseUser} = require('./objects').default


function getQueryByType(type: string = 'post') {
  return new Parse.Query(ParsePost).include('topics').include('postAuthor')
}

function getPostsParameters(terms) {
  return new Parameters.Posts(getQueryByType())
    .addParameters(terms)
    .end()
}

export default {
  getQueryByType,
  getPostsParameters
}
