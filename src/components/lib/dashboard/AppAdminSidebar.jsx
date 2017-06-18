import Telescope from '../index'
import React, { Component } from 'react'

class AppAdminSidebar extends Component {

  onSidebarMenuClick (type) {
    // this.context.messages.appManagement.pushAdminSidebar(this.props.router, type)
  }

  renderAppItemsMenu () {

    const {location} = this.props,
      pathname = location.pathname || '',
      type = pathname.replace('/management/', '')

    debugger

    return (
      <ul className="sidebar-menu" id="adminmenu">
        {/*<li className="header">MAIN NAVIGATION</li>*/}
        <li className={'treeview ' + (!type ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, '')}>
            <i className="fa fa-dashboard"/>
            <span>Dashboard</span>
          </a>
        </li>
        {/*post sub menu*/}
        <li className={'treeview ' + (type === 'posts' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'posts')}>
            <i className="fa fa-edit"/>
            <span>Posts</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'topics' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'topics')}>
            <i className="fa fa-edit"/>
            <span>Topics</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'flags' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'flags')}>
            <i className="fa fa-th"/>
            <span>Reported Posts</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'images' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'images')}>
            <i className="fa fa-th"/>
            <span>Uploaded Images</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'comments' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'comments')}>
            <i className="fa fa-comments"/>
            <span>Comments</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'users' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'users')}>
            <i className="fa fa-users"/>
            <span>Users</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'settings' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'settings')}>
            <i className="wp-menu-image dashicons-before dashicons-admin-settings"/>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    )
  }

  renderCrawlerItemsMenu () {
    const {location} = this.props
    const type = location.query || ''

    return (
      <ul className="sidebar-menu" id="adminmenu">
        {/*<li className="header">Scraper Items</li>*/}
        <li className={'treeview ' + (type === 'caches' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'caches')}>
            <i className="fa fa-th"/>
            <span>Caches</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'history' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'history')}>
            <i className="fa fa-history"/>
            <span>History</span>
          </a>
        </li>
        <li className={'treeview ' + (type === 'scrapyd' ? 'active' : '')}>
          <a onClick={this.onSidebarMenuClick.bind(this, 'scrapyd')}>
            <i className="fa fa-tasks"/>
            <span>Scrapyd</span>
          </a>
        </li>
      </ul>
    )
  }

  render () {
    return (
      <aside className="main-sidebar">
        <section className="sidebar admin-sidebar">
          {this.renderAppItemsMenu()}
          {this.renderCrawlerItemsMenu()}
        </section>
      </aside>
    )

  }
}

export default AppAdminSidebar
