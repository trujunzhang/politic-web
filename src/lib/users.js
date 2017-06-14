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

Users.getPopoverMenuArray = function (user, isMobileDevice) {
    const menuArrays = [];
    if (!!isMobileDevice) {
        menuArrays.push([
            {type: "acticle", link: {pathname: "/", query: {action: "new"}}, title: "Submit an article"},
            {type: "separator"},
        ]);
    }
    menuArrays.push([
        {type: "profile", link: Users.getLinkObject("profile", user), title: "MY PROFILE"},
        {type: "collections", link: Users.getLinkObject("collections", user), title: "MY COLLECTIONS"},
        {type: "separator"}
    ]);
    menuArrays.push([
        {type: "settings", link: Users.getLinkObject("editing"), title: "SETTINGS"},
        {type: Users.isAdmin(user) ? "management" : "", link: {pathname: "/management"}, title: "MANAGEMENT"},
        {type: "separator"}
    ]);
    menuArrays.push([
        {type: "logout", title: "LOGOUT"}
    ]);
    return _.flatten(menuArrays);
};

module.exports = Users;
export default Users;
