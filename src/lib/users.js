var Telescope = require('../components/lib/index').default
import React from 'react'
let _ = require('underscore')
let md5 = require('blueimp-md5')
let Gravatar = require('./gravatar').default

const Users = {}

Users.avatar = {

  // Default functionality. You can override these options by calling
  // Users.avatar.setOptions (do not set this.options directly)

  options: {

    // Determines the type of fallback to use when no image can be found via
    // linked services (Gravatar included):
    //   'default image' (the default option, which will show either the image
    //   specified by defaultImageUrl, the package's default image, or a Gravatar
    //   default image)
    //     OR
    //   'initials' (show the user's initials).
    fallbackType: '',

    // This will replace the included default avatar image's URL
    // ('packages/utilities_avatar/default.png'). It can be a relative path
    // (relative to website's base URL, e.g. 'images/defaultthis.png').
    defaultImageUrl: 'https://placekitten.com/80/80',

    // This property name will be used to fetch an avatar url from the user's profile
    // (e.g. 'avatar'). If this property is set and a property of that name exists
    // on the user's profile (e.g. user.profile.avatar) that property will be used
    // as the avatar url.
    customImageProperty: '',

    // Gravatar default option to use (overrides default image URL)
    // Options are available at:
    // https://secure.gravatar.com/site/implement/images/#default-image
    gravatarDefault: '',

    // This property is used to prefix the CSS classes of the DOM elements.
    // If no value is set, then the default CSS class assigned to all DOM elements are prefixed with 'avatar' as default.
    // If a value is set to, 'foo' for example, the resulting CSS classes are prefixed with 'foo'.
    cssClassPrefix: '',

    // This property defines the letious image sizes available
    imageSizes: {
      'large': 80,
      'small': 30,
      'extra-small': 20
    },

    // Default background color when displaying the initials.
    // Can also be set to a function to map an user object to a background color.
    backgroundColor: '#aaa',

    // Default text color when displaying the initials.
    // Can also be set to a function to map an user object to a text color.
    textColor: '#fff',

    // Generate the required CSS and include it in the head of your application.
    // Setting this to false will exclude the generated CSS and leave the
    // avatar unstyled by the package.
    generateCSS: true
  },

  // Sets the Avatar options. You must use this setter function rather than assigning directly to
  // this.options, otherwise the stylesheet won't be generated.

  setOptions: function (options) {
    this.options = _.extend(this.options, options)
  },

  // Returns the cssClassPrefix property from options
  getCssClassPrefix: function () {
    return this.options.cssClassPrefix ? this.options.cssClassPrefix : 'avatar'
  },

  // Returns a background color for initials
  getBackgroundColor: function (user) {
    if (_.isString(this.options.backgroundColor))
      return this.options.backgroundColor
    else if (_.isFunction(this.options.backgroundColor))
      return this.options.backgroundColor(user)
  },

  // Returns a text color for initials
  getTextColor: function (user) {
    if (_.isString(this.options.textColor))
      return this.options.textColor
    else if (_.isFunction(this.options.textColor))
      return this.options.textColor(user)
  },

  // Get the initials of the user
  getInitials: function (user) {

    let initials = ''
    let name = ''
    let parts = []

    if (user && user.profile && user.profile.firstName) {
      initials = user.profile.firstName.charAt(0).toUpperCase()

      if (user.profile.lastName) {
        initials += user.profile.lastName.charAt(0).toUpperCase()
      }
      else if (user.profile.familyName) {
        initials += user.profile.familyName.charAt(0).toUpperCase()
      }
      else if (user.profile.secondName) {
        initials += user.profile.secondName.charAt(0).toUpperCase()
      }
    }
    else {
      if (user && user.username) {
        name = user.username
      }

      parts = name.split(' ')
      // Limit getInitials to first and last initial to avoid problems with
      // very long multi-part names (e.g. 'Jose Manuel Garcia Galvez')
      initials = _.first(parts).charAt(0).toUpperCase()
      if (parts.length > 1) {
        initials += _.last(parts).charAt(0).toUpperCase()
      }
    }

    return initials
  },

  // Get the url of the user's avatar
  // XXX: this.getUrl is a reactive function only when no user argument is specified.
  getUrl: function (user) {

    // Default to the currently logged in user, unless otherwise specified.
    if (!user) return null

    let url = ''
    let defaultUrl, svc

    if (user) {
      svc = this.getService(user)

      url = Users.avatar.getUrlByService(user, svc)
    }

    return url
  },

  getUrlByService: function (user, svc) {

    // Default to the currently logged in user, unless otherwise specified.
    if (!user) return null

    let url = ''
    let defaultUrl

    if (user) {
      if (svc === 'twitter') {
        // use larger image (200x200 is smallest custom option)
        url = user.services.twitter.profile_image_url_https.replace('_normal.', '_200x200.')
      }
      else if (svc === 'facebook') {
        // use larger image (~200x200)
        url = 'https://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large'
      }
      else if (svc === 'google') {
        url = user.services.google.picture
      }
      else if (svc === 'github') {
        url = 'https://avatars.githubusercontent.com/' + user.services.github.username + '?s=200'
      }
      else if (svc === 'instagram') {
        url = user.services.instagram.profile_picture
      }
      else if (svc === 'linkedin') {
        url = user.services.linkedin.pictureUrl
      }
      else if (svc === 'custom') {
        url = this.getCustomUrl(user)
      }
      else if (svc === 'none') {
        defaultUrl = this.options.defaultImageUrl || '/packages/utilities_avatar/default.png'
        // If it's a relative path (no '//' anywhere), complete the URL
        if (defaultUrl.indexOf('//') === -1) {
          // Add starting slash if it does not exist
          if (defaultUrl.charAt(0) !== '/') defaultUrl = '/' + defaultUrl
          // Then add the relative path to the server's base URL
          defaultUrl = [window.location.origin, defaultUrl].join('')
        }
        url = this.getGravatarUrl(user, defaultUrl)
      }
    }

    return url
  },

  getService: function (user) {
    let services = user && user.services || {}
    if (this.getCustomUrl(user)) {
      return 'custom'
    }
    let service = _.find([['twitter', 'profile_image_url_https'], ['facebook', 'id'], ['google', 'picture'], ['github', 'username'], ['instagram', 'profile_picture'], ['linkedin', 'pictureUrl']], function (s) {
      return !!services[s[0]] && s[1].length && !!services[s[0]][s[1]]
    })
    if (!service)
      return 'none'
    else
      return service[0]
  },

  computeUrl: function (prop, user) {
    if (typeof prop === 'function') {
      prop = prop.call(user)
    }
    if (prop && typeof prop === 'string') {
      return prop
    }
  },

  getDescendantProp: function (obj, desc) {
    let arr = desc.split('.')
    while (arr.length && (obj = obj[arr.shift()]))
      return obj
  },

  getCustomUrl: function (user) {

    let customProp = user && this.options.customImageProperty
    if (typeof customProp === 'function') {
      return this.computeUrl(customProp, user)
    } else if (customProp) {
      return this.computeUrl(this.getDescendantProp(user, customProp), user)
    }
  },

  getGravatarUrl: function (user, defaultUrl) {
    let gravatarDefault
    let validGravatars = ['404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'blank']

    // Initials are shown when Gravatar returns 404.
    if (this.options.fallbackType !== 'initials') {
      let valid = _.contains(validGravatars, this.options.gravatarDefault)
      gravatarDefault = valid ? this.options.gravatarDefault : defaultUrl
    }
    else {
      gravatarDefault = '404'
    }

    let emailOrHash = this.getUserEmail(user) || Users.getEmailHash(user)
    // let secure = true;
    let options = {
      // NOTE: Gravatar's default option requires a publicly accessible URL,
      // so it won't work when your app is running on localhost and you're
      // using an image with either the standard default image URL or a custom
      // defaultImageUrl that is a relative path (e.g. 'images/defaultthis.png').
      size: 200, // use 200x200 like twitter and facebook above (might be useful later)
      default: gravatarDefault,
      secure: true
    }
    return emailOrHash ? Gravatar.imageUrl(emailOrHash, options) : null

  },

  // Get the user's email address
  getUserEmail: function (user) {
    let emails = _.pluck(user.emails, 'address')
    return emails[0] || null
  },

  // Returns the size class to use for an avatar
  getSizeClass: function (context) {
    // Defaults are 'large', 'small', 'extra-small', but user can add new ones
    return this.options.imageSizes[context.size] ? this.getCssClassPrefix() + '-' + context.size : ''
  },

  // Returns the shape class for an avatar
  getShapeClass: function (context) {
    let valid = ['rounded', 'circle']
    return _.contains(valid, context.shape) ? this.getCssClassPrefix() + '-' + context.shape : ''
  },

  // Returns the custom class(es) for an avatar
  getCustomClasses: function (context) {
    return context.class ? context.class : ''
  },

  // Returns the initials text for an avatar
  getInitialsText: function (user, context) {
    return context.initials || this.getInitials(user)
  }

}

/**
 * @summary Get a user's email hash
 * @param {Object} user
 */
Users.getEmailHash = function (user) {
  return md5(user.email)
}

/**
 * @summary Check if a user has upvoted a document
 * @param {Object} user
 * @param {Object} document
 */
Users.hasUpvoted = function (user, document) {
  return user && _.include(document.upvoters, user._id)
}

/**
 * @summary Check if a user has downvoted a document
 * @param {Object} user
 * @param {Object} document
 */
Users.hasDownvoted = function (user, document) {
  return user && _.include(document.downvoters, user._id)
}

Users.renderWithSideBar = function (children) {
  return (
    <div className="constraintWidth_ZyYbM container_3aBgK">
      <div className="content_1jnXo">
        {children}
        <Telescope.components.AppSideBar/>
      </div>
    </div>
  )
}

Users.getPopoverMenuArray = function (user, isMobileDevice) {
  const menuArrays = []
  if (!!isMobileDevice) {
    menuArrays.push([
      {type: 'acticle', link: {pathname: '/', query: {action: 'new'}}, title: 'Submit an article'},
      {type: 'separator'},
    ])
  }
  menuArrays.push([
    {type: 'profile', link: Users.getLinkObject('profile', user), title: 'MY PROFILE'},
    {type: 'collections', link: Users.getLinkObject('collections', user), title: 'MY COLLECTIONS'},
    {type: 'separator'}
  ])
  menuArrays.push([
    {type: 'settings', link: Users.getLinkObject('editing'), title: 'SETTINGS'},
    {type: Users.isAdmin(user) ? 'management' : '', link: {pathname: '/management'}, title: 'MANAGEMENT'},
    {type: 'separator'}
  ])
  menuArrays.push([
    {type: 'logout', title: 'LOGOUT'}
  ])
  return _.flatten(menuArrays)
}

Users.getCollectionsPopover = function (left, top, popWidth, popHeight, offX, defaultClassName = 'v-bottom-left') {
  if (Users.isMobileDevice()) {
    return {
      style: {
        top: (popHeight === -1) ? top : (((window.innerHeight - popHeight) / 2) + window.pageYOffset),
        left: ((window.innerWidth - popWidth ) / 2 + offX)
      },
      className: 'popover v-center-center'
    }
  }

  return {style: {top: top, left: left + offX}, className: `popover ${defaultClassName}`}
}

Users.getPopoverMenuArray = function (user, isMobileDevice) {
  const menuArrays = []
  if (!!isMobileDevice) {
    menuArrays.push([
      {type: 'acticle', link: {pathname: '/', query: {action: 'new'}}, title: 'Submit an article'},
      {type: 'separator'},
    ])
  }
  menuArrays.push([
    {type: 'profile', link: Users.getLinkObject('profile', user), title: 'MY PROFILE'},
    {type: 'collections', link: Users.getLinkObject('collections', user), title: 'MY COLLECTIONS'},
    {type: 'separator'}
  ])
  menuArrays.push([
    {type: 'settings', link: Users.getLinkObject('editing'), title: 'SETTINGS'},
    {type: Users.isAdmin(user) ? 'management' : '', link: {pathname: '/management'}, title: 'MANAGEMENT'},
    {type: 'separator'}
  ])
  menuArrays.push([
    {type: 'logout', title: 'LOGOUT'}
  ])
  return _.flatten(menuArrays)
}

Users.checkArticleInFolder = function (postId, folder) {
  return folder.posts.indexOf(postId) !== -1
}

Users.getAvatarObj = function (user) {
  if (!user) {
    return {haveAvatar: false, url: null, avatarId: -1, title: '', slug: ''}
  }
  const url = Users.avatar.getUrl(user)
  if (!!url) {
    return {
      haveAvatar: true,
      url: url,
      avatarId: user._id,
      title: Users.getDisplayName(user),
      slug: user.slug
    }
  }
  return {
    haveAvatar: false,
    url: Users.avatar.getInitials(user),
    avatarId: user._id,
    title: Users.getDisplayName(user),
    slug: user.slug
  }
}

/**
 * @summary Get a user's display name (not unique, can take special characters and spaces)
 * @param {Object} user
 */
Users.getDisplayName = function (user) {
  if (typeof user === 'undefined') {
    return ''
  } else {
    return user.name
  }
}

export default Users
