import Telescope from '../components/lib/index';
import React from 'react';
var _ = require('underscore');
const Users = {};


/**
 * @summary Check if a user has upvoted a document
 * @param {Object} user
 * @param {Object} document
 */
Users.hasUpvoted = function (user, document) {
    return user && _.include(document.upvoters, user._id);
};

/**
 * @summary Check if a user has downvoted a document
 * @param {Object} user
 * @param {Object} document
 */
Users.hasDownvoted = function (user, document) {
    return user && _.include(document.downvoters, user._id);
};


Users.renderWithSideBar = function (children) {
    return (
        <div className="constraintWidth_ZyYbM container_3aBgK">
            <div className="content_1jnXo">
                {children}
                <Telescope.components.AppSideBar/>
            </div>
        </div>
    );
};

module.exports = Users;
export default Users;
