var _ = require('underscore')

function adjustNewQuery (router, newQuery) {
  const query = _.clone(router.location.query)
  if (query.before && query.after) {
    newQuery['before'] = query.before
    newQuery['after'] = query.after
  }
}

export function pushForTopic (router, topic) {
  const obj = {pathname: `/topic/${topic.id}/${topic.name}`, query: {}}
  adjustNewQuery(router, obj.query)
  router.push(obj)
}

