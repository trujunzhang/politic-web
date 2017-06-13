import Telescope from './config';

// common
Telescope.registerComponent("Error404",                         require('./common/Error404.js'));
Telescope.registerComponent("App",                              require('./common/App.js'));


module.exports = Telescope;
export default Telescope;
