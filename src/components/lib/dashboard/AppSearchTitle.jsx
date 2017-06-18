import React from 'react'

const AppSearchTitle = (props, context) => {
  const location = props.location || {}
  const query = location.query || {}

  return (!!query.query) ? (<span className="subtitle">{'Search results for “' + query.query + '”'}</span>) : null
}

export default AppSearchTitle
