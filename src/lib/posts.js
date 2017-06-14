// import Telescope from '../components/lib/index';

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
    // if (post.userId === Telescope.settings.get('scraped_user_id', 'yv57iwi6Zq8jaM7uD')) {
    //     const author = post.author;
    //     if (!!author) {
    //         return 'default/' + author + '.jpg';
    //     }
    // }

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

    let cloudinaryUrls = post['cloudinaryUrls'];
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


module.exports = Posts;
export default Posts;
