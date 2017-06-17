import Telescope from '../index'
import React, { Component } from 'react'

class AppAdminLayout extends Component {
  renderChildren () {
    const {type} = this.props.location.query

    switch (type) {
      case 'posts':
        return <Telescope.components.AppAdminPosts key="posts"/>
      case 'categories':
        return <Telescope.components.AppAdminCategories key="categories"/>
      case 'topics':
        return <Telescope.components.AppAdminTopics key="topics"/>
      case 'flags':
        return <Telescope.components.AppAdminFlags key="flags"/>
      case 'images':
        return <Telescope.components.AppAdminImages key="images"/>
      case 'users':
        return <Telescope.components.AppAdminUsers key="users"/>
      case 'settings':
        return <Telescope.components.AppSettings key="settings"/>
      case 'comments':
        return <Telescope.components.AppAdminComments key="comments"/>
      case 'caches':
        return <Telescope.components.AppAdminCaches key="caches"/>
      case 'history':
        return <Telescope.components.AppAdminHistory key="history"/>
      case 'scrapyd':
        return <Telescope.components.AppAdminScrapyd key="scrapyd"/>
      default:
        return (
          <Telescope.components.SatisticContainer
            key="statistic"
            publication="admin.app.statistic"
            listId={'app.statistic'}
            countKeys={[
              'postsCount',
              'usersCount',
              'commentsCount'
            ]}
            component={Telescope.components.AppAdminDashboard}
          />
        )
    }
  }

  render () {
    return (
      <div id="admin-dashboard" className="hold-transition skin-blue sidebar-mini">
        <Telescope.components.HeadTags googleAnalytics={true} showDrift={false}/>

        <Telescope.components.PopoverFlashes flashBox={this.context.messages.flashBox}/>
        <div className="wrapper">
          <Telescope.components.AppAdminHeader />

          <Telescope.components.AppAdminSidebar />

          <div className="content-wrapper admin-content">

            <div id="wpcontent">
              <div id="wpbody" role="main">

                <div id="wpbody-content">
                  {this.renderChildren()}
                </div>
              </div>

            </div>
          </div>

          <Telescope.components.AppAdminFooter />
        </div>
      </div>
    )

  }
}

export default AppAdminLayout
