import Telescope from '../../index'
import React from 'react'

const AdminTablesTopicsColumn = ({results}, context) => {

  let topics = []
  if (results && results.length > 0) {
    results.map((topic, index) => {
        topics.push(
          <a className="margin_right2" key={index}
             onClick={(e) => context.messages.appManagement.appendQuery(this.props.router, 'topics', topic)}>
            {topic.name + ((index !== results.length - 1) ? ',' : '')}
          </a>
        )
      }
    )
  } else {
    topics.push(<span key={'no-topic'}>No Topics</span>)
  }

  return (
    <td className="topics column-topics">
      {topics}
    </td>
  )
}

export default AdminTablesTopicsColumn
