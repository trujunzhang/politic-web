import Telescope from '../components/lib';
import React from 'react';
let _ = require('underscore');
const Folders = {};


Folders.checkAccessPermission = function (folder, folderUser, currentUser) {
  if (folder.visible === "Lock") {
    if (((typeof currentUser) === 'undefined')) { // No logged User.
      return false;
    }
    if (folderUser.id !== currentUser.id) { // Different Users
      return false;
    }
  }

  return true;
};

Folders.checkEditPermission = function (folder, folderUser, currentUser) {
  if (((typeof currentUser) === 'undefined')) { // No logged User.
    return false;
  }
  if (folderUser.id === currentUser.id) { // Users themself
    return true;
  }

  return false;
};

Folders.getDefaultFolderName = function () {
  return "Read Later";
};


/**
 * @summary Get a folder's URL
 * @param {Object} folder
 * @param isAbsolute
 */
Folders.getUrl = function (folder, isAbsolute) {
  isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  let prefix = isAbsolute ? Telescope.utils.getSiteUrl() : "";
  return `${prefix}/?cat=${folder.slug}`;
};

Folders.getFolderNames = function (folders) {
  let names = _.pluck(folders, 'name')

  return names
};


export default Folders
