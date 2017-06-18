import Telescope from '../index'
import React, { Component } from 'react'

class AppAdminSidebar extends Component {

  render () {
    const {location} = this.props,
      pathname = location.pathname || '',
      type = pathname.replace('/management/', '')

    const menus1 = [
      {title: 'Dashboard', icon: 'fa fa-dashboard', tag: ''},
      {title: 'Posts', icon: 'fa fa-edit', tag: 'posts'},
      {title: 'Topics', icon: 'fa fa-tasks', tag: 'topics'},

      {title: 'Reported Posts', icon: 'fa fa-th', tag: 'flags'},
      {title: 'Uploaded Images', icon: 'fa fa-th', tag: 'images'},
      {title: 'Comments', icon: 'fa fa-comments', tag: 'comments'},

      {title: 'Users', icon: 'fa fa-users', tag: 'users'},
      {title: 'Settings', icon: 'wp-menu-image dashicons-before dashicons-admin-settings', tag: 'settings'},
    ]

    const menus2 = [
      {title: 'Caches', icon: 'fa fa-th', tag: 'caches'},
      {title: 'History', icon: 'fa fa-history', tag: 'history'},
      {title: 'Scrapyd', icon: 'fa fa-tasks', tag: 'scrapyd'}
    ]

    return (
      <aside className="main-sidebar">
        <section className="sidebar admin-sidebar">
          <ul className="sidebar-menu" id="adminmenu">
            {menus1.map((item, index) =>
              <li className={'treeview ' + (type === item.tag ? 'active' : '')}>
                <a onClick={this.onSidebarMenuClick.bind(this, item.tag)}>
                  <i className={item.icon}/>
                  <span>{item.title}</span>
                </a>
              </li>
            )}
          </ul>
          <ul className="sidebar-menu" id="adminmenu">
            {menus2.map((item, index) =>
              <li className={'treeview ' + (type === item.tag ? 'active' : '')}>
                <a onClick={this.onSidebarMenuClick.bind(this, item.tag)}>
                  <i className={item.icon}/>
                  <span>{item.title}</span>
                </a>
              </li>
            )}
          </ul>
        </section>
      </aside>
    )

  }
}

export default AppAdminSidebar
