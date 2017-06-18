import Telescope from '../index'
import React, { Component } from 'react'

class AppAdminLayout extends Component {

  renderChildren () {
    const {location} = this.props
    const pathname = location.pathname || ''
    const type = pathname.replace('/management/', '')

    switch (type) {
      case 'posts':
        return <Telescope.components.AppAdminPostsList
          location={location}
          key="posts"
          listId: 'admin.posts.list'
          terms={
            {
              ...location.query,
              listId: 'admin.posts.list',
              limit: 10
            }
          }/>
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
        return (<Telescope.components.AppAdminDashboard/>)
    }
  }

  render () {
    return (
      <div id="admin-dashboard" className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <Telescope.components.AppAdminHeader />

          <Telescope.components.AppAdminSidebar location={this.props}/>

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
