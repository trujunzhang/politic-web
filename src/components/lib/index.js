import Telescope from './config'

// actions
Telescope.registerComponent('ArticleDownvote',                require('./actions/ArticleDownvote.jsx').default)
Telescope.registerComponent('ArticleUpvote',                  require('./actions/ArticleUpvote.jsx').default)
Telescope.registerComponent('Downvote',                       require('./actions/Downvote.jsx').default)
Telescope.registerComponent('PostsCommenters',                require('./actions/PostsCommenters.jsx').default)
Telescope.registerComponent('RelatedPostDownvote',            require('./actions/RelatedPostDownvote.jsx').default)
Telescope.registerComponent('RelatedPostUpvote',              require('./actions/RelatedPostUpvote.jsx').default)
Telescope.registerComponent('Upvote',                         require('./actions/Upvote.jsx').default)

// extensions
Telescope.registerComponent('AvatarBlurryImage',                require('./extensions/AvatarBlurryImage.jsx').default)
Telescope.registerComponent('BlurryImage',                      require('./extensions/BlurryImage.jsx').default)
Telescope.registerComponent('MailTo',                           require('./extensions/MailTo.jsx').default)
Telescope.registerComponent('UsersBlurryImageAvatar',           require('./extensions/UsersBlurryImageAvatar.jsx').default)

// common
Telescope.registerComponent('Layout',                           require('./common/Layout.jsx').default)
Telescope.registerComponent('Error404',                         require('./common/Error404.jsx').default)
Telescope.registerComponent('App',                              require('./common/App.js').default)
Telescope.registerComponent('HeaderContent',                    require('./common/HeaderContent.jsx').default)
Telescope.registerComponent('HeaderContentSearchBar',           require('./common/HeaderContentSearchBar.jsx').default)
Telescope.registerComponent('Newsletter',                       require('./common/Newsletter.jsx').default)
Telescope.registerComponent('NewsletterButton',                 require('./common/NewsletterButton.jsx').default)

// posts
Telescope.registerComponent('PostsDaily',                 require('./posts/PostsDaily.jsx').default)
Telescope.registerComponent('PostsDay',                   require('./posts/PostsDay.jsx').default)
Telescope.registerComponent('PostsDomain',                require('./posts/PostsDomain.jsx').default)
Telescope.registerComponent('PostsHome',                  require('./posts/PostsHome.jsx').default)
Telescope.registerComponent('PostsHomeList',              require('./posts/PostsHomeList.jsx').default)
Telescope.registerComponent('PostsItem',                  require('./posts/PostsItem.jsx').default)
Telescope.registerComponent('PostsItemActions',           require('./posts/PostsItemActions.jsx').default)
Telescope.registerComponent('PostsItemEditActions',       require('./posts/PostsItemEditActions.jsx').default)
Telescope.registerComponent('PostsItemTopics',            require('./posts/PostsItemTopics.jsx').default)
Telescope.registerComponent('PostsList',                  require('./posts/PostsList.jsx').default)
Telescope.registerComponent('PostsListTitle',             require('./posts/PostsListTitle.jsx').default)
Telescope.registerComponent('PostsLoading',               require('./posts/PostsLoading.jsx').default)
Telescope.registerComponent('PostsLoadMore',              require('./posts/PostsLoadMore.jsx').default)
Telescope.registerComponent('PostsNoResults',             require('./posts/PostsNoResults.jsx').default)
Telescope.registerComponent('PostsPopularThisWeek',       require('./posts/PostsPopularThisWeek.jsx').default)

// Sidebar
Telescope.registerComponent('AppSideBar',           require('./sidebar/AppSideBar.jsx').default)
Telescope.registerComponent('WidgetHeader',         require('./sidebar/WidgetHeader.jsx').default)

Telescope.registerComponent('Week',                 require('./sidebar/widgetscalendar/Week.jsx').default)
Telescope.registerComponent('WidgetCalendar',       require('./sidebar/widgetscalendar/WidgetCalendar.jsx').default)

Telescope.registerComponent('WidgetTopics',         require('./sidebar/widgettopics/WidgetTopics.jsx').default)

Telescope.registerComponent('TwitterTimeline',      require('./sidebar/widgettwitter/TwitterTimeline.jsx').default)
Telescope.registerComponent('WidgetTwitter',        require('./sidebar/widgettwitter/WidgetTwitter.jsx').default)

Telescope.registerComponent('AppAbout',            require('./sidebar/widgetapps/AppAbout.jsx').default)
Telescope.registerComponent('AppCareers',          require('./sidebar/widgetapps/AppCareers.jsx').default)
Telescope.registerComponent('AppContact',          require('./sidebar/widgetapps/AppContact.jsx').default)
Telescope.registerComponent('AppFooter',           require('./sidebar/widgetapps/AppFooter.jsx').default)
Telescope.registerComponent('AppPrivacy',          require('./sidebar/widgetapps/AppPrivacy.jsx').default)
Telescope.registerComponent('AppTermsOfService',   require('./sidebar/widgetapps/AppTermsOfService.jsx').default)
Telescope.registerComponent('WidgetAppFollower',   require('./sidebar/widgetapps/WidgetAppFollower.jsx').default)
Telescope.registerComponent('WidgetAppFooter',     require('./sidebar/widgetapps/WidgetAppFooter.jsx').default)
Telescope.registerComponent('WidgetMobileApps',    require('./sidebar/widgetapps/WidgetMobileApps.jsx').default)

// overlay
Telescope.registerComponent('AppOverlay',                    require('./overlay/AppOverlay.jsx').default)
Telescope.registerComponent('MoreTagsPopoverMenu',           require('./overlay/MoreTagsPopoverMenu.jsx').default)
Telescope.registerComponent('SubmitFlagPopover',             require('./overlay/SubmitFlagPopover.jsx').default)
Telescope.registerComponent('UsersPopoverMenu',              require('./overlay/UsersPopoverMenu.jsx').default)

Telescope.registerComponent('CollectionsResult',              require('./overlay/collections/CollectionsResult.jsx').default)
Telescope.registerComponent('UserCollectionsPopover',         require('./overlay/collections/UserCollectionsPopover.jsx').default)

Telescope.registerComponent('UserEmailSignIn',                require('./overlay/login/UserEmailSignIn.jsx').default)
Telescope.registerComponent('UserEmailSignUp',                require('./overlay/login/UserEmailSignUp.jsx').default)
Telescope.registerComponent('UserLoginLayout',                require('./overlay/login/UserLoginLayout.jsx').default)
Telescope.registerComponent('UserLoginMain',                  require('./overlay/login/UserLoginMain.jsx').default)
Telescope.registerComponent('UserLoginPopup',                 require('./overlay/login/UserLoginPopup.jsx').default)
Telescope.registerComponent('UsersRemovedAccount',            require('./overlay/login/UsersRemovedAccount.jsx').default)
Telescope.registerComponent('UsersResetPassword',             require('./overlay/login/UsersResetPassword.jsx').default)
Telescope.registerComponent('UsersVerifyEmail',               require('./overlay/login/UsersVerifyEmail.jsx').default)

// users
Telescope.registerComponent('UsersMenu',               require('./users/UsersMenu.jsx').default)

export default Telescope
