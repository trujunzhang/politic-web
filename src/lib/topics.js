import Telescope from './settings'

let _ = require('underscore');
const Topics = {};

/**
 * @summary Topics config namespace
 * @type {Object}
 */
Topics.config = {};

Topics.config.STATUS_APPROVED = 1;
Topics.config.STATUS_DELETED = 2;
Topics.config.STATUS_FILTER = 3;

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


export default Topics
