import Telescope from '../components/lib/index';
import React from 'react';
let _ = require('underscore');
const Topics = {};


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
