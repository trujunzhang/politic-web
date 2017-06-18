import Telescope from '../index'
import React, { Component } from 'react'
import { Link } from 'react-router'

class AppAdminSidebar extends Component {

  render () {
    const {location} = this.props,
      pathname = location.pathname || '',
      type = pathname.replace('/management/', '')

    const menus1 = [
      {title: 'Dashboard', icon: 'fa fa-dashboard', tag: '', link: ''},
      {title: 'Posts', icon: 'fa fa-edit', tag: 'posts', link: '/posts'},
      {title: 'Topics', icon: 'fa fa-tasks', tag: 'topics', link: '/topics'},

      {title: 'Reported Posts', icon: 'fa fa-th', tag: 'flags', link: '/flags'},
      {title: 'Uploaded Images', icon: 'fa fa-th', tag: 'images', link: '/images'},
      {title: 'Comments', icon: 'fa fa-comments', tag: 'comments', link: '/comments'},

      {title: 'Users', icon: 'fa fa-users', tag: 'users', link: '/users'},
      {
        title: 'Settings',
        icon: 'wp-menu-image dashicons-before dashicons-admin-settings',
        tag: 'settings',
        link: '/settings'
      },
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
                <Link to={`/management${item.link}`}>
                  <i className={item.icon}/>
                  <span>{item.title}</span>
                </Link>
              </li>
            )}
          </ul>
          <ul className="sidebar-menu" id="adminmenu">
            {menus2.map((item, index) =>
              <li className={'treeview ' + (type === item.tag ? 'active' : '')}>
                <Link to={`/management${item.link}`}>
                  <i className={item.icon}/>
                  <span>{item.title}</span>
                </Link>
              </li>
            )}
          </ul>
        </section>
      </aside>
    )

  }
}

export default AppAdminSidebar
