import Telescope from './config';

// common
Telescope.registerComponent("Layout",                           require('./common/Layout.jsx'));

Telescope.registerComponent("Error404",                         require('./common/Error404.jsx'));
Telescope.registerComponent("App",                              require('./common/App.js'));

Telescope.registerComponent("HeaderContent",                    require('./common/HeaderContent.jsx'));
Telescope.registerComponent("HeaderContentSearchBar",           require('./common/HeaderContentSearchBar.jsx'));
// Telescope.registerComponent("HeaderNavigation",                 require('./common/HeaderNavigation.jsx'));


module.exports = Telescope;
export default Telescope;
