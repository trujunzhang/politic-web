import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'


class UsersEditConnections extends Component {

  constructor(props, context) {
    super(props);
    this.state = this.initialState = {
      fb_mgs: false,
      twitter_msg: false
    };
  }

  onConnectToFacebook() {
    const self = this;
    const options = {};
    // Meteor.connectWithFacebook(options, function () {
    //   //console.log(arguments);
    //   if (arguments.length > 0) {
    //     const argument = arguments[0];
    //     if (argument.length > 0) {
    //       const errorClass = argument[0];
    //       if (!!errorClass) {
    //         if (errorClass.error === 408) {
    //           self.setState({fb_mgs: true});
    //         } else {
    //           self.context.messages.flash(errorClass.reason, "error");
    //         }
    //       }
    //     }
    //   }
    // });
  }

  onConnectToTwitter() {
    const self = this;
    const options = {};
    // Meteor.connectWithTwitter(options, function () {
    //   //console.log(arguments);
    //   if (arguments.length > 0) {
    //     const argument = arguments[0];
    //     if (argument.length > 0) {
    //       const errorClass = argument[0];
    //       if (!!errorClass) {
    //         if (errorClass.error === 408) {
    //           self.setState({twitter_msg: true});
    //         } else {
    //           self.context.messages.flash(errorClass.reason, "error");
    //         }
    //       }
    //     }
    //   }
    // });
  }

  onDisconnectClick(type) {
    this.context.actions.call('users.disconnect.service', type, (error, result) => {
      if (!!error) {
      }
    });
  }

  /**
   * Issue #132: Connecting Already Connected Twitter + Facebook Accounts
   * If a user has already connected a twitter or facebook account but tries to connect the same twitter or facebook account with another politicl account.
   * Can we show an error message?
   * "Your Facebook account is already connected to another Politicl account. Please disconnect or delete it from your old Polticl account to complete the process. Email us at contact@politicl.com for assistance!"
   * "Your Twitter account is already connected to another Politicl account. Please disconnect or delete it from your old Politicl account to complete the process. Email us at contact@politicl.com for assistance!"
   * @param type
   * @returns {XML}
   */
  generateConnections(type) {
    const {user} = this.props,
      sectionKey = `connection-${type}`,
      connectionObj = Users.getServiceInformation(user, type),
      facebookTitle =
        //"Your Facebook friends (who are also on&nbsp;Politicl) have become part of your network on&nbsp;Politicl. We will never post to&nbsp;Facebook or message your friends without your permission.",
        "We will never post from your Facebook profile or message your friends without your permission.",
      twitterTitle =
        //"Connections you have on Twitter (who are also on&nbsp;Politicl) have become part of your network on&nbsp;Politicl. We will never post to&nbsp;Twitter or message your followers without your permission.";
        " We will never post from your Twitter profile or message your followers without your permission.";

    switch (type) {
      case "facebook":
        if (!!connectionObj) {
          return (
            <section key={sectionKey} className="list-item list-item--padded">
              <div className="list-itemInfo">
                <h2 className="list-itemTitle">You are connected to Facebook</h2>
                <p className="list-itemDescription">{facebookTitle}</p>
              </div>
              <div className="list-itemActions list-itemActions--facebook">
                <img className="list-itemImage list-itemImage--facebook" src={connectionObj.url}/>
                <span className="list-itemActionGroup">
                                  <span className="list-itemName list-itemName--facebook">{connectionObj.title}</span>
                                  <button
                                    onClick={this.onDisconnectClick.bind(this, type)}
                                    className="button button--chromeless u-baseColor--buttonNormal button--disconnect button--dangerHover js-facebookDisconnect"
                                    disabled={(user.loginType === Users.config.TYPE_FACEBOOK)}>
                                      (disconnect)
                                  </button>
                                  <button
                                    className="button button--chromeless u-baseColor--buttonNormal button--disconnect u-hide js-disconnectFacebookHelp">How do I disconnect?</button>
                              </span>
              </div>
            </section>
          )
        } else {
          return (
            <div key={sectionKey}>
              <section className="list-item list-item--padded">
                <div className="list-itemInfo">
                  <h2 className="list-itemTitle">Connect to Facebook</h2>
                  <p className="list-itemDescription">{facebookTitle}</p>
                </div>
                <div className="list-itemActions list-itemActions--facebook">
                  <button
                    onClick={this.onConnectToFacebook.bind(this)}
                    className="button button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--withIconAndLabel button--facebook button--signin js-facebookButton"
                    title="Connect your Facebook account to Politicl">
                              <span className="svgIcon svgIcon--facebookFilled svgIcon--21px">
                                  <svg className="svgIcon-use" width="21" height="21" viewBox="0 0 21 21">
                                      <path
                                        d="M18.26 10.55c0-4.302-3.47-7.79-7.75-7.79-4.28 0-7.75 3.488-7.75 7.79a7.773 7.773 0 0 0 6.535 7.684v-5.49h-1.89v-2.2h1.89v-1.62c0-1.882 1.144-2.907 2.814-2.907.8 0 1.48.06 1.68.087V8.07h-1.15c-.91 0-1.09.435-1.09 1.07v1.405h2.16l-.28 2.2h-1.88v5.515c3.78-.514 6.7-3.766 6.7-7.71"/>
                                  </svg>
                              </span>
                    <span className="button-label  js-buttonLabel">Connect to Facebook</span>
                  </button>
                </div>
              </section>
              {!!this.state.fb_mgs ?
                (
                  <div className="flash-message alert alert-warning">
                    Your Facebook account is already connected to another Politicl account. Please disconnect or delete
                    it from your old Polticl account to complete the process. Email us at <Telescope.components.MailTo
                    email="contact@politicl.com"/> for assistance!
                  </div>
                )
                : null}
            </div>
          )
        }

      case "twitter":
        if (!!connectionObj) {
          return (
            <section key={sectionKey} className="list-item list-item--padded">
              <div className="list-itemInfo">
                <h2 className="list-itemTitle">You are connected to Twitter</h2>
                <p className="list-itemDescription">{twitterTitle}</p>
              </div>
              <div className="list-itemActions list-itemActions--twitter">
                <img className="list-itemImage list-itemImage--twitter" src={connectionObj.url}/>
                <span className="list-itemActionGroup">
                              <span className="list-itemName list-itemName--twitter">{"@" + connectionObj.title}</span>
                                  <button
                                    onClick={this.onDisconnectClick.bind(this, type)}
                                    className="button button--chromeless u-baseColor--buttonNormal button--disconnect button--dangerHover u-hide js-twitterDisconnect"
                                    disabled={(user.loginType === Users.config.TYPE_TWITTER)}>
                                      (disconnect)
                                  </button>
                                  <button
                                    className="button button--chromeless u-baseColor--buttonNormal button--disconnect js-disconnectTwitterHelp">How do I disconnect?</button>
                          </span>
              </div>
            </section>
          )
        } else {
          return (
            <div key={sectionKey}>
              <section className="list-item list-item--padded">
                <div className="list-itemInfo">
                  <h2 className="list-itemTitle">Connect to Twitter</h2>
                  <p className="list-itemDescription">{twitterTitle}</p>
                </div>
                <div className="list-itemActions list-itemActions--twitter">
                  <button
                    onClick={this.onConnectToTwitter.bind(this)}
                    className="button button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--withIconAndLabel button--twitter button--signin js-twitterButton"
                    title="Connect your Twitter account to Politicl">
                                  <span className="svgIcon svgIcon--twitterFilled svgIcon--21px">
                                      <svg className="svgIcon-use" width="21" height="21" viewBox="0 0 21 21">
                                          <path
                                            d="M18.502 4.435a6.892 6.892 0 0 1-2.18.872 3.45 3.45 0 0 0-2.552-1.12 3.488 3.488 0 0 0-3.488 3.486c0 .276.03.543.063.81a9.912 9.912 0 0 1-7.162-3.674c-.3.53-.47 1.13-.498 1.74.027 1.23.642 2.3 1.557 2.92a3.357 3.357 0 0 1-1.555-.44.15.15 0 0 0 0 .06c-.004 1.67 1.2 3.08 2.8 3.42-.3.06-.606.1-.934.12-.216-.02-.435-.04-.623-.06.42 1.37 1.707 2.37 3.24 2.43a7.335 7.335 0 0 1-4.36 1.49L2 16.44A9.96 9.96 0 0 0 7.355 18c6.407 0 9.915-5.32 9.9-9.9.015-.18.01-.33 0-.5A6.546 6.546 0 0 0 19 5.79a6.185 6.185 0 0 1-1.992.56 3.325 3.325 0 0 0 1.494-1.93"/>
                                      </svg>
                                  </span>
                    <span className="button-label  js-buttonLabel">Connect to Twitter</span>
                  </button>
                </div>
              </section>
              {!!this.state.twitter_msg ?
                (
                  <div className="flash-message alert alert-warning">
                    Your Twitter account is already connected to another Politicl account. Please disconnect or delete
                    it from your old Politicl account to complete the process. Email us at <Telescope.components.MailTo
                    email="contact@politicl.com"/> for assistance!
                  </div>
                )
                : null}
            </div>
          )
        }
    }
  }

  render() {
    let sections = [this.generateConnections("facebook"), this.generateConnections('twitter')];
    return (
      <div className="paddedBox_2UY-S box_c4OJj" id="user_profile_social">
        <div className="header_for_user_profile_social">
                  <span>
                      <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">Connections</span>
                  </span>
        </div>
        <div className="list u-marginBottom50">
          {sections}
        </div>
      </div>
    )
  }
}

export default UsersEditConnections

