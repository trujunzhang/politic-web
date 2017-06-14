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
Telescope.registerComponent("PostsDaily",                 require('./posts/PostsDaily.jsx'));
Telescope.registerComponent("PostsDay",                   require('./posts/PostsDay.jsx'));
Telescope.registerComponent("PostsDomain",                require('./posts/PostsDomain.jsx'));
Telescope.registerComponent("PostsHome",                  require('./posts/PostsHome.jsx'));
Telescope.registerComponent("PostsHomeList",              require('./posts/PostsHomeList.jsx'));
Telescope.registerComponent("PostsItem",                  require('./posts/PostsItem.jsx'));
Telescope.registerComponent("PostsItemEditActions",       require('./posts/PostsItemEditActions.jsx'));
Telescope.registerComponent("PostsList",                  require('./posts/PostsList.jsx'));
Telescope.registerComponent("PostsListTitle",             require('./posts/PostsListTitle.jsx'));
Telescope.registerComponent("PostsLoading",               require('./posts/PostsLoading.jsx'));
Telescope.registerComponent("PostsLoadMore",              require('./posts/PostsLoadMore.jsx'));
Telescope.registerComponent("PostsNoResults",             require('./posts/PostsNoResults.jsx'));
Telescope.registerComponent("PostsPopularThisWeek",       require('./posts/PostsPopularThisWeek.jsx'));

// Sidebar
Telescope.registerComponent("AppSideBar",           require('./sidebar/AppSideBar.jsx'));
Telescope.registerComponent("WidgetHeader",         require('./sidebar/WidgetHeader.jsx'));

Telescope.registerComponent("Week",                 require('./sidebar/widgetscalendar/Week.jsx'));
Telescope.registerComponent("WidgetCalendar",       require('./sidebar/widgetscalendar/WidgetCalendar.jsx'));

Telescope.registerComponent("WidgetTopics",         require('./sidebar/widgettopics/WidgetTopics.jsx'));

Telescope.registerComponent("TwitterTimeline",      require('./sidebar/widgettwitter/TwitterTimeline.jsx'));
Telescope.registerComponent("WidgetTwitter",        require('./sidebar/widgettwitter/WidgetTwitter.jsx'));

Telescope.registerComponent("AppAbout",            require('./sidebar/widgetapps/AppAbout.jsx'));
Telescope.registerComponent("AppCareers",          require('./sidebar/widgetapps/AppCareers.jsx'));
Telescope.registerComponent("AppContact",          require('./sidebar/widgetapps/AppContact.jsx'));
Telescope.registerComponent("AppFooter",           require('./sidebar/widgetapps/AppFooter.jsx'));
Telescope.registerComponent("AppPrivacy",          require('./sidebar/widgetapps/AppPrivacy.jsx'));
Telescope.registerComponent("AppTermsOfService",   require('./sidebar/widgetapps/AppTermsOfService.jsx'));
Telescope.registerComponent("WidgetAppFollower",   require('./sidebar/widgetapps/WidgetAppFollower.jsx'));
Telescope.registerComponent("WidgetAppFooter",     require('./sidebar/widgetapps/WidgetAppFooter.jsx'));
Telescope.registerComponent("WidgetMobileApps",    require('./sidebar/widgetapps/WidgetMobileApps.jsx'));

module.exports = Telescope;
export default Telescope;
