import Telescope from './config';

// common
Telescope.registerComponent("Layout",                           require('./common/Layout.jsx'));

Telescope.registerComponent("Error404",                         require('./common/Error404.jsx'));
Telescope.registerComponent("App",                              require('./common/App.js'));

Telescope.registerComponent("HeaderContent",                    require('./common/HeaderContent.jsx'));
Telescope.registerComponent("HeaderContentSearchBar",           require('./common/HeaderContentSearchBar.jsx'));
// Telescope.registerComponent("HeaderNavigation",                 require('./common/HeaderNavigation.jsx'));



// posts

Telescope.registerComponent("PostsHome",            require('./posts/PostsHome.jsx'));
Telescope.registerComponent("PostsList",            require('./posts/PostsList.jsx'));
Telescope.registerComponent("PostsListTitle",       require('./posts/PostsListTitle.jsx'));
Telescope.registerComponent("PostsLoading",         require('./posts/PostsLoading.jsx'));

module.exports = Telescope;
export default Telescope;
