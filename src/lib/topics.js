import Telescope from './settings'

let _ = require('underscore');
const Topics = {};

/**
 * @summary Topics config namespace
 * @type {Object}
 */
Topics.config = {};

Topics.config.STATUS_APPROVED = 1
Topics.config.STATUS_DELETED = 2
Topics.config.STATUS_FILTER = 3

Topics.config.PUBLISH_STATUS = [
  Topics.config.STATUS_APPROVED,
  Topics.config.STATUS_FILTER,
];

Topics.config.STATUS_TITLES = [
  "",
  'Publish',
  'Trash', // trash is the same as Deleted.
  'Filter'
];

Topics.getTopicStatus = (topic, state) => {
  let statusArray = [];
  if (topic.active) {
    statusArray.push("active");
  }
  let topicStatus = Topics.config.STATUS_TITLES[topic.status];
  if (state.toLowerCase() !== topicStatus.toLowerCase()) {
    if (topic.status !== Topics.config.STATUS_APPROVED) {
      statusArray.push(topicStatus);
    }
  }

  return statusArray;
};


export default Topics
