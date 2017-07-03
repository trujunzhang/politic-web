'use strict'

const Parse = require('parse')
let {ParseFolder, ParsePost} = require('./objects').default

import type {Action, ThunkAction} from '../actions/types'

async function makeNewFolderForUser(user: Any, foldName: string = 'Read Later', postId: string = null): Promise {
  let data = {
    'name': foldName,
    'visible': (foldName === 'Read Later') ? 'Lock' : '',
    'user': user,
    posts: []
  }
  if (!!postId) {
    data['posts'] = [ParsePost.createWithoutData(postId)]
  }
  return await new ParseFolder(data).save()
}



async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}

export default {makeNewFolderForUser}

