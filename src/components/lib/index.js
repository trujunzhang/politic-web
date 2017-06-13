import Telescope from './config';

// common
Telescope.registerComponent("Layout",                           require('./common/Layout.jsx'));

Telescope.registerComponent("Error404",                         require('./common/Error404.jsx'));
Telescope.registerComponent("App",                              require('./common/App.js'));


module.exports = Telescope;
export default Telescope;
