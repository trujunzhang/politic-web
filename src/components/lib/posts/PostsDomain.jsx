import React from 'react'
import { Link } from 'react-router'

/**
 * A: Remove “THE-VIEWSPAPER” from there
 * B: YES
 * A: “theviewspaper.net” on a line between the title and read more and link it to the domain page
 * B: “theviewspaper.net” on a line between the title and read more and link it to the domain page, need to add click event?
 * A: YES
 */
const PostsDomain = ({post, domainClass}) => {
  let domain = (post.sourceFrom || '').replace('www.', '')

  return (
    <span className={`domain_item ${domainClass}`}>
      <Link to={`/from/${domain}`}>
        <span className="domain">{domain}</span>
      </Link>
    </span>
  )
}

export default PostsDomain

