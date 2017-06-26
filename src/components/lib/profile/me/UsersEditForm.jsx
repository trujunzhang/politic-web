import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'

import TextareaAutosize from 'react-textarea-autosize';

class UsersEditForm extends Component {

  /**
   * 17/12/2016
   *
   * Change "Biography" to "Bio", and limit it to 200 characters
   * User display image should be changeable. The user should be able to upload a new display image.
   * The cover image should be fetched automatically from Facebook/Twitter. And this should be changeable. The user should be able to upload a new cover image.
   * Change "News Letter" to "Newsletter"
   * Remove "Website"
   * Remove "My invites"
   * If user logins in via twitter, it should say "Twitter Account Connected".
   * If user logins in via Facebook, it should say "Facebook Account Connected"
   */

  constructor(props) {
    super(props);

    const {user} = this.props;
    const displayName = Users.getDisplayName(user),
      biography = user.bio || "",
      isSubscribed = user.newsletter_subscribed || false,
      email = user.email || ''

    this.state = this.initialState = {
      // Detail
      displayName: displayName,
      biography: biography,
      email: email,
      website: user.website,
      twitterUsername: user.twitterUsername,
      // Notification
      notifications_users: user.notifications_users,
      notifications_posts: user.notifications_posts,
      notifications_comments: user.notifications_comments,
      notifications_replies: user.notifications_replies,
      // Message
      message: null,
      // Submit
      isSaving: false,
      // profile cover
      thumbnailValue: '',
      coverId: user.coverId,
      coverUrls: user.coverUrls,
      localUploadPath: user.localUploadPath,
      // Subscription status
      isSubscribed: isSubscribed
    };
  }

  onUpdateButtonClick() {
    const {user} = this.props;
    let editUser = {
      "displayName": this.state.displayName,
      "bio": this.state.biography,
      "email": this.state.email,
      "website": this.state.website,
      "twitterUsername": this.state.twitterUsername,
      // Notification
      "notifications_posts": this.state.notifications_posts,
      "notifications_comments": this.state.notifications_comments,
      "notifications_replies": this.state.notifications_replies,
      // Cover
      "coverId": this.state.coverId,
      "coverUrls": this.state.coverUrls,
      "localUploadPath": this.state.localUploadPath
    };
    if (user.isAdmin) {
      // admin
      editUser['notifications_users'] = this.state.notifications_users;
    }
    this.setState({isSaving: true, message: {message: '', type: ''}});
    const {isSubscribed} = this.state,
      subscribed = user.newsletter_subscribed || false

    const needUpdateSubscription = isSubscribed !== subscribed;

    // this.context.actions.call('users.edit', this.props.user._id, {$set: editUser}, (error, result) => {
    //   if (!!error) {
    //     if (error.error === "email_taken2") {
    //       this.setState({isSaving: false, message: {message: "this email is already token!", type: "error"}});
    //     } else {
    //       this.setState({isSaving: false, message: {message: "Saved failure!", type: "error"}});
    //     }
    //   } else {
    //     if (needUpdateSubscription) {
    //       const action = Users.getSetting(this.props.user, 'newsletter.subscribed', false) ?
    //         'newsletter.removeUser' : 'newsletter.addUser';
    //       this.context.actions.call(action, this.props.user, (error, result) => {
    //         if (error) {
    //           this.setState({isSaving: false, message: {message: "Newsletter failure!", type: "error"}});
    //           //console.log(error); // eslint-disable-line
    //           this.context.messages.flash(error.message, "error");
    //         } else {
    //           this.setState({isSaving: false, message: {message: "", type: "success"}});
    //         }
    //       });
    //     } else {
    //       this.setState({isSaving: false, message: {message: "", type: "success"}});
    //     }
    //   }
    // });
  }

  renderAvatar() {
    return (
      <label className="field_1LaJb">
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Profile Header</span>
        <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
          <div className="mediaUpload_1A2VG">
            <input type="text" id="url_header_uuid" placeholder="https://"/>
            <input type="file" id="file_header_uuid" accept="image/gif, image/jpeg, image/png"/>
            <input type="hidden" name="header_uuid" value=""/>
          </div>
        </div>
        <hr className="ruler_1ti8u"/>
      </label>
    )
  }

  renderUserEmail() {
    // TODO: 10/02/2017:
    // Issue #81: Disable Update Email Option
    /*onChange={(e) => this.setState({email: e.target.value})}*/
    return (
      <label className="field_1LaJb">
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Email</span>
        <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2"
             id="user-profile-email">
          <input type="email"
                 className="user-profile-email-input"
                 name="email"
                 disabled="true"
                 title="To change your email address please write to us at contact@politicl.com."
                 value={this.state.email}/>
          <span className="list-itemDescription">
                      {"To change your email address please write to us at "}
            <Telescope.components.MailTo email="contact@politicl.com"/>
                      .
                  </span>
        </div>
        <hr className="ruler_1ti8u"/>
      </label>
    )
  }

  renderAccountDetail() {
    return (
      <div className="paddedBox_2UY-S box_c4OJj">
        <div className="header_3GFef">
                  <span>
                      <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">My Details</span>
                  </span>
        </div>
        <div className="content_DcBqe">
          <label className="field_1LaJb">
            <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Name</span>
            <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
              <input type="text"
                     name="name"
                     onChange={(e) => this.setState({displayName: e.target.value})}
                     value={this.state.displayName}/>
            </div>
            <hr className="ruler_1ti8u"/>
          </label>
          {/*Change "Biography" to "Bio", and limit it to 200 characters*/}
          <label className="field_1LaJb">
            <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Bio</span>
            <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
              <TextareaAutosize
                maxLength={200}
                useCacheForDOMMeasurements
                style={{boxSizing: 'border-box'}}
                maxRows={6}
                value={this.state.biography}
                onChange={e => this.setState({biography: e.target.value})}
              />
            </div>
            <hr className="ruler_1ti8u"/>
          </label>
          {this.renderUserEmail()}
          {/*Remove "Website"*/}
          {this.renderFeatureImage()}
        </div>
      </div>
    )
  }

  renderNewsPostNotification() {
    return (
      <label className="notification_1AVqu">
        <input type="checkbox" name="notifications_posts"
               onChange={(e) => this.setState({"notifications_posts": !this.state.notifications_posts})}
               checked={this.state.notifications_posts}/>
        New Posts Notifications
      </label>
    )
  }

  renderNotification() {
    const {user} = this.props;
    return (
      <div className="paddedBox_2UY-S box_c4OJj">
        <div className="header_3GFef">
                  <span >
                      <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">Notifications</span>
                  </span>
        </div>
        <div className="content_DcBqe">
          <div className="field_1LaJb">
            <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Email</span>
            <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
              {Users.isAdmin(user) ?
                (<label className="notification_1AVqu">
                  <input type="checkbox" name="notifications_users"
                         onChange={(e) => this.setState({"notifications_users": !this.state.notifications_users})}
                         checked={this.state.notifications_users}/>
                  New Users Notifications
                </label>)
                : null}
              {/*{this.renderNewsPostNotification()}*/}
              <label className="notification_1AVqu">
                <input type="checkbox" name="notifications_comments"
                       onChange={(e) => this.setState({"notifications_comments": !this.state.notifications_comments})}
                       checked={this.state.notifications_comments}/>
                Comment Notifications
              </label>
              <label className="notification_1AVqu">
                <input type="checkbox" name="notifications_replies"
                       onChange={(e) => this.setState({"notifications_replies": !this.state.notifications_replies})}
                       checked={this.state.notifications_replies}/>
                Reply the comment Notifications
              </label>
            </div>
            <hr className="ruler_1ti8u"/>
          </div>
        </div>
      </div>
    )
  }

  onFeatureImageChange(thumbnailValue, coverId, localUploadPath) {
    this.setState({
      thumbnailValue: thumbnailValue,
      coverId: coverId,
      localUploadPath: localUploadPath
    });
  }

  renderFeatureImage() {
    const {user} = this.props;
    const preview = Users.getUserCoverUrl(user);
    return (
      <div className="field_1LaJb" id="thumbnail">
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Profile Header</span>
        <Telescope.components.ArticleFeatureImage
          thumbnailValue={this.state.thumbnailValue}
          imageId={this.state.coverId}
          preview={preview}
          uploadType={"cover"}
          onFeatureImageChange={this.onFeatureImageChange.bind(this)}
        />
        <hr className="ruler_1ti8u"/>
      </div>
    )
  }

  renderNewsLetter() {
    //const {isSubscribed} = this.state;
    let title = "Subscribe to Politicl's Weekly Newsletter";
    //if (isSubscribed){
    //title = "Subscribed to Politicl's Weekly Newsletter";
    //}

    //Change "News Letter" to "Newsletter"
    return (
      <div className="paddedBox_2UY-S box_c4OJj">
        <div className="header_3GFef">
                  <span >
                      <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">Newsletter</span>
                  </span>
        </div>
        <div className="content_DcBqe">
          <div className="field_1LaJb">
            <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Subscription</span>
            <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
              <label className="notification_1AVqu">
                <input type="checkbox"
                       name="isSubscribed"
                       onChange={(e) => this.setState({isSubscribed: !this.state.isSubscribed})}
                       checked={this.state.isSubscribed}/>
                {title}
              </label>
            </div>
            <hr className="ruler_1ti8u"/>
          </div>
        </div>
      </div>
    )
  }

  renderHint() {
    const {message} = this.state;
    if (!!message) {
      if (message.type === "success") {
        return (
          <span className="success_1BtDc secondaryText_PM80d default_tBeAo base_3CbW2">
                      <span>
                          Updated!
                      </span>
                  </span>
        );
      } else {
        return (
          <span className="failure_mCTlk secondaryText_PM80d default_tBeAo base_3CbW2">
                      <span>
                          {"Oh-oh! " + this.state.message.message}
                      </span>
                  </span>
        );
      }

    }
    return null;
  }

  onDeleteAccountClick(event) {
    this.context.messages.showPopoverMenu("UserDeleteConfirm", {});
  }

  renderDeleteAccount() {
    return (
      <div className="paddedBox_2UY-S box_c4OJj" id="user_profile_delete_account">
        <div className="header_for_user_profile_social">
                  <span>
                      <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">Delete account</span>
                  </span>
        </div>
        <label className="field_1LaJb">
          <div className="list u-marginBottom50">
            <div className="list-item_delete_Info">
              <p className="list-itemDescription">Permanently delete your account and all of your
                content.</p>
              <button
                onClick={this.onDeleteAccountClick.bind(this)}
                className="button button--chromeless u-baseColor--buttonNormal button--delete">
                Delete account
              </button>
            </div>
          </div>
          <hr className="ruler_1ti8u"/>
        </label>
      </div>
    )
  }

  render() {
    const {isSaving} = this.state;
    return (
      <div className="constraintWidth_ZyYbM container_3aBgK">
        <div>
          {/*Header title*/}
          <div className="headline_3NiTB headline_azIav default_tBeAo base_3CbW2">Settings</div>

          {this.renderAccountDetail()}
          <Telescope.components.UsersEditConnections user={this.props.user}/>
          {this.renderNotification()}
          {this.renderNewsLetter()}
          {this.renderDeleteAccount()}

          <div className="left_3jL0S buttonGroup_2NmU8">
            {isSaving ?
              (<button
                className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf"
                disabled="">
                <div className="buttonContainer_wTYxi">
                  <span>Update…</span>
                </div>
              </button>) :
              (<button
                onClick={this.onUpdateButtonClick.bind(this)}
                className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf">
                <div className="buttonContainer_wTYxi">Update</div>
              </button>)
            }
            {isSaving ?
              (
                <span className="submitting_1vFUc secondaryText_PM80d default_tBeAo base_3CbW2">
                               <span>Saving…</span>
                           </span>
              ) : this.renderHint()}
          </div>
        </div>
      </div>
    )
  }

}

export default UsersEditForm
