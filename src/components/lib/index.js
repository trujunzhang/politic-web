import Telescope from './config'

// actions
Telescope.registerComponent('ArticleDownvote',                require('./actions/ArticleDownvote.jsx').default)
Telescope.registerComponent('ArticleUpvote',                  require('./actions/ArticleUpvote.jsx').default)
Telescope.registerComponent('PostItemVoteButton',             require('./actions/PostItemVoteButton.jsx').default)
Telescope.registerComponent('PostsCommenters',                require('./actions/PostsCommenters.jsx').default)
Telescope.registerComponent('PostsReadMore',                  require('./actions/PostsReadMore.jsx').default)
Telescope.registerComponent('PostsSingleHeaderRight',         require('./actions/PostsSingleHeaderRight.jsx').default)
Telescope.registerComponent('RelatedPostDownvote',            require('./actions/RelatedPostDownvote.jsx').default)
Telescope.registerComponent('RelatedPostUpvote',              require('./actions/RelatedPostUpvote.jsx').default)
Telescope.registerComponent('TopicItem',                      require('./actions/TopicItem.jsx').default)


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

// postsoverlay
Telescope.registerComponent('PopoverPosts',                 require('./postsoverlay/PopoverPosts.jsx').default)
Telescope.registerComponent('PopoverPostsLayout',           require('./postsoverlay/PopoverPostsLayout.jsx').default)

// postsoverlay(page)
Telescope.registerComponent('PostDetail',                         require('./postsoverlay/page/PostDetail.jsx').default)
Telescope.registerComponent('PostsPage',                          require('./postsoverlay/page/PostsPage.jsx').default)
Telescope.registerComponent('PostsPageTopics',                    require('./postsoverlay/page/PostsPageTopics.jsx').default)
Telescope.registerComponent('PostsRelatedItem',                   require('./postsoverlay/page/PostsRelatedItem.jsx').default)
Telescope.registerComponent('PostsRelatedList',                   require('./postsoverlay/page/PostsRelatedList.jsx').default)
Telescope.registerComponent('PostsSingleHeader',                  require('./postsoverlay/page/PostsSingleHeader.jsx').default)

// profile
Telescope.registerComponent('UserProfileHeader',                   require('./profile/UserProfileHeader.jsx').default)
Telescope.registerComponent('UsersProfile',                        require('./profile/UsersProfile.jsx').default)
Telescope.registerComponent('UsersSingle',                         require('./profile/UsersSingle.jsx').default)

// profile(list)
Telescope.registerComponent('UserProfilePostsList',                require('./profile/list/UserProfilePostsList.jsx').default)

// profile(menus)
Telescope.registerComponent('UsersCollectionFoldersList',          require('./profile/menus/UsersCollectionFoldersList.jsx').default)
Telescope.registerComponent('UsersDownvote',                       require('./profile/menus/UsersDownvote.jsx').default)
Telescope.registerComponent('UsersSubmittedPostsList',             require('./profile/menus/UsersSubmittedPostsList.jsx').default)
Telescope.registerComponent('UsersUpvote',                         require('./profile/menus/UsersUpvote.jsx').default)

// profile(folders)
Telescope.registerComponent('FoldersItem',                       require('./profile/folders/FoldersItem.jsx').default)
Telescope.registerComponent('FoldersList',                       require('./profile/folders/FoldersList.jsx').default)

// profile(folder item list)
Telescope.registerComponent('FolderPostsList',                         require('./profile/singlefolder/FolderPostsList.jsx').default)
Telescope.registerComponent('UserFolderProfileBackButtonSection',      require('./profile/singlefolder/UserFolderProfileBackButtonSection.jsx').default)
Telescope.registerComponent('UserFolderProfileHeader',                 require('./profile/singlefolder/UserFolderProfileHeader.jsx').default)
Telescope.registerComponent('UsersFolderProfile',                      require('./profile/singlefolder/UsersFolderProfile.jsx').default)

// profile(me)
Telescope.registerComponent('UsersEdit',                         require('./profile/me/UsersEdit.jsx').default)
Telescope.registerComponent('UsersEditForm',                     require('./profile/me/UsersEditForm.jsx').default)

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

// article
Telescope.registerComponent('ArticleFeatureImage',               require('./article/ArticleFeatureImage.jsx').default)
Telescope.registerComponent('ArticleTopics',                     require('./article/ArticleTopics.jsx').default)
Telescope.registerComponent('FirstTypeLink',                     require('./article/FirstTypeLink.jsx').default)
Telescope.registerComponent('HintInfo',                          require('./article/HintInfo.jsx').default)
Telescope.registerComponent('SecondInfo',                        require('./article/SecondInfo.jsx').default)
Telescope.registerComponent('SubmitAnArticle',                   require('./article/SubmitAnArticle.jsx').default)

// users
Telescope.registerComponent('UsersMenu',               require('./users/UsersMenu.jsx').default)

// dashboard
Telescope.registerComponent('AppAdminFooter',                require('./dashboard/AppAdminFooter.jsx').default)
Telescope.registerComponent('AppAdminHeader',                require('./dashboard/AppAdminHeader.jsx').default)
Telescope.registerComponent('AppAdminLayout',                require('./dashboard/AppAdminLayout.jsx').default)
Telescope.registerComponent('AppAdminSidebar',               require('./dashboard/AppAdminSidebar.jsx').default)
Telescope.registerComponent('AppSearchTitle',                require('./dashboard/AppSearchTitle').default)

// dashboard(default)
Telescope.registerComponent('AppAdminDashboard',               require('./dashboard/default/AppAdminDashboard.jsx').default)

// dashboard(tables)
Telescope.registerComponent('AdminTables',                        require('./dashboard/tables/AdminTables.jsx').default)
Telescope.registerComponent('AdminTablesCommentsColumn',          require('./dashboard/tables/AdminTablesCommentsColumn.jsx').default)
Telescope.registerComponent('AdminTablesCommonColumn',            require('./dashboard/tables/AdminTablesCommonColumn.jsx').default)
Telescope.registerComponent('AdminTablesRow',                     require('./dashboard/tables/AdminTablesRow.jsx').default)
Telescope.registerComponent('AdminTablesTH',                      require('./dashboard/tables/AdminTablesTH.jsx').default)
Telescope.registerComponent('AdminTablesTopicsColumn',            require('./dashboard/tables/AdminTablesTopicsColumn.jsx').default)
Telescope.registerComponent('PaginationContainer',                require('./dashboard/tables/PaginationContainer.jsx').default)

// dashboard(posts)
Telescope.registerComponent('AppAdminPostDateTime',                require('./dashboard/posts/AppAdminPostDateTime.jsx').default)
Telescope.registerComponent('AppAdminPostItemAction',              require('./dashboard/posts/AppAdminPostItemAction.jsx').default)
Telescope.registerComponent('AppAdminPostsAction',                 require('./dashboard/posts/AppAdminPostsAction.jsx').default)
Telescope.registerComponent('AppAdminPostsEditAll',                require('./dashboard/posts/AppAdminPostsEditAll.jsx').default)
Telescope.registerComponent('AppAdminPostsEditSingle',             require('./dashboard/posts/AppAdminPostsEditSingle.jsx').default)
Telescope.registerComponent('AppAdminPostsList',                   require('./dashboard/posts/AppAdminPostsList.jsx').default)
Telescope.registerComponent('AppAdminPostsTopAction',              require('./dashboard/posts/AppAdminPostsTopAction.jsx').default)


export default Telescope
