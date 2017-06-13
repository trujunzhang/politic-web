import Telescope from '../components/lib/index';
import React, {Component} from 'react';

const Posts = {};

Posts.showReady = function (results, hasMore, ready, totalCount, limit, firstPagination) {
    if (!firstPagination) { // ignoring it, if not the first pagination.
        return false;
    }
    if (typeof totalCount === "undefined" || !ready || typeof results === "undefined") {
        return true;
    }
    if (ready && !hasMore && results.length === 0) {//empty list
        return false;
    }
    if (!ready && hasMore && results.length <= limit) {// first pagination and already ready.
        return true;
    }
    if (hasMore && !!results && results.length > limit) {
        return false;
    }
    if (hasMore && (results.length % limit) !== 0) {
        return true;
    }
    return false;
};


module.exports = Posts;
export default Posts;
