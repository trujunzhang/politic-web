import Telescope from './settings';
import moment from 'moment';

const Posts = {};


/**
 * @summary generate 15 days as the day filter for posts list admin
 */
Posts.getDateQueryString = function (date) {
    return moment(date).format("YYYY-MM-DD");
};


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


/**
 * @summary limit the post's content
 * @param {Object} content
 * @param limit
 */
Posts.getLimitedContent = function (content, limit) {
    let mytextlet = content;

    if ((content).length > limit) {
        mytextlet = content.substring(0, limit - 3) + '...';
    }
    return mytextlet;
};


Posts.getDefaultImageFromType = (post) => {
    if (post.userId === Telescope.settings.get('scraped_user_id', 'yv57iwi6Zq8jaM7uD')) {
        const author = post.author;
        if (!!author) {
            return 'default/' + author + '.jpg';
        }
    }

    return null;
};


/**
 * @summary Get the complete thumbnail url whether it is hosted on Embedly or on an external website, or locally in the app.
 * @param {Object} post
 */
Posts.getImageFromType = (post) => {
    let thumbnailUrl = null;
    // http://localhost:3000/cdn/storage/undefined/268cc214-4cd0-47a8-a2d2-444d72eaa5b1/thumbnail400/268cc214-4cd0-47a8-a2d2-444d72eaa5b1
    // http://localhost:3000/files/images/Images/39c72a14-2bec-4d5c-b9de-fc076b26e026/thumbnail400/39c72a14-2bec-4d5c-b9de-fc076b26e026.jpg

    let cloudinaryUrls = post.cloudinaryUrls;
    if (!!cloudinaryUrls && cloudinaryUrls.length > 0) {
        thumbnailUrl = cloudinaryUrls[0].url
    }
    else if (!thumbnailUrl && !!post.thumbnailUrl) {
        thumbnailUrl = post.thumbnailUrl;
    }
    // if (!!thumbnailUrl) {
    //     return thumbnailUrl.indexOf('//') > -1 ? Telescope.utils.addHttp(thumbnailUrl) : Telescope.utils.getSiteUrl() + thumbnailUrl;
    // }

    return Posts.getDefaultImageFromType(post);
};

/**
 * @summary Get the complete thumbnail url whether it is hosted on Embedly or on an external website, or locally in the app.
 * @param {Object} post
 */
Posts.getThumbnailSet = (post) => {
    const small = Posts.getImageFromType(post);

    return {small: small};
};


/**
 * @summary Convert date to string using moment.js
 * @param {Object} date
 */
Posts.getDailyDateTitle = function (date) {
    let title = "";

    if (!!date) {
        let REFERENCE = moment(new Date()); // today
        let TODAY = REFERENCE.clone().startOf('day');
        let YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');

        const momentDate = moment(date);
        let prefix = "";
        if (momentDate.isSame(TODAY, 'd')) {
            title = "Today, " + momentDate.format("MMMM Do");
        } else if (momentDate.isSame(YESTERDAY, 'd')) {
            title = "Yesterday, " + momentDate.format("MMMM Do");
        } else {
            title = momentDate.format("dddd, MMMM Do");
        }
    }

    return title;
};

/**
 * @summary statistic topics.
 */
Posts.generatePostListTitle = function (query) {
    let title = null;

    let preTitle = "Articles";

    if (query.query) {
        title = `${preTitle} in ${query.query}`;
    }
    else if (query.from) {
        title = `${preTitle} in ${query.from}`;
    }
    else if (query.author) {
        title = `${preTitle} in ${query.author}`;
    } else if (query.userId) {
        title = `${preTitle} by ${query.title}`;
    }
    else if (query.after) {
        if (query.cat || query.topicId) {
            title = `${query.title} on ${moment(query.after).format("MMMM Do")}`;
        } else {
            title = Posts.getDailyDateTitle(moment(query.after));
        }
    } else if (query.cat || query.topicId) {
        title = `${preTitle} in ${query.title}`;
    }

    if (query.admin) {
        if (!title) {
            let status = query.status;
            title = `${preTitle} in ${status}`;
        }
        title += " [APPROVING]";
    }

    return {showHeader: !!title, title: title};
};


export default Posts;
