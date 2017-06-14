import Telescope from './config';

// common
Telescope.registerComponent("Layout",                           require('./common/Layout.jsx'));

Telescope.registerComponent("Error404",                         require('./common/Error404.jsx'));
Telescope.registerComponent("App",                              require('./common/App.js'));

Telescope.registerComponent("HeaderContent",                    require('./common/HeaderContent.jsx'));
Telescope.registerComponent("HeaderContentSearchBar",           require('./common/HeaderContentSearchBar.jsx'));
// Telescope.registerComponent("HeaderNavigation",                 require('./common/HeaderNavigation.jsx'));

Telescope.registerComponent("Newsletter",                       require('./common/Newsletter.jsx'));
Telescope.registerComponent("NewsletterButton",                 require('./common/NewsletterButton.jsx'));



// posts
Telescope.registerComponent("PostsDomain",          require('./posts/PostsDomain.jsx'));
Telescope.registerComponent("PostsHome",            require('./posts/PostsHome.jsx'));
Telescope.registerComponent("PostsHomeList",        require('./posts/PostsHomeList.jsx'));
Telescope.registerComponent("PostsItem",            require('./posts/PostsItem.jsx'));
Telescope.registerComponent("PostsItemActions",     require('./posts/PostsItemActions.jsx'));
Telescope.registerComponent("PostsItemEditActions", require('./posts/PostsItemEditActions.jsx'));
Telescope.registerComponent("PostsList",            require('./posts/PostsList.jsx'));
Telescope.registerComponent("PostsListTitle",       require('./posts/PostsListTitle.jsx'));
Telescope.registerComponent("PostsLoading",         require('./posts/PostsLoading.jsx'));
Telescope.registerComponent("PostsLoadMore",        require('./posts/PostsLoadMore.jsx'));

module.exports = Telescope;
export default Telescope;
