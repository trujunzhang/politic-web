import React from 'react'

const AppSearchTitle = (props, context) => {
  const query = props.location.query.query

  return (!!query) ? (<span className="subtitle">{'Search results for “' + query + '”'}</span>) : null
}

export default AppSearchTitle
