import keyMirror from 'key-mirror'

export default keyMirror({
  // Login UI
  LOGIN_FORM_TYPE_MAIN: null,
  LOGIN_FORM_TYPE_LOGIN: null,
  LOGIN_FORM_TYPE_REGISTER: null,
  LOGIN_FORM_TYPE_FORGOTPASSWORD: null,
  LOGIN_FORM_TYPE_RESET_PASSWD: null,


  // User Profile Type
  USERPROFILE_TYPE_UPVOTE: null,
  USERPROFILE_TYPE_DOWNVOTE: null,
  USERPROFILE_TYPE_SUBMITTED_POSTS: null,
  USERPROFILE_TYPE_FOLDER_LIST: null,

  // UserProfile Event Type
  USERPROFILE_RESET: null,
  USERPROFILE_LOADED: null,

  // Voting button types
  VOTE_BUTTON_LIST_UPVOTE: null,
  VOTE_BUTTON_LIST_DOWNVOTE: null,
  VOTE_BUTTON_ARTICLE_UPVOTE: null,
  VOTE_BUTTON_ARTICLE_DOWNVOTE: null,
  VOTE_BUTTON_RELATED_UPVOTE: null,
  VOTE_BUTTON_RELATED_DOWNVOTE: null,


  // Voting
  POSTS_UPVOTE: null,
  POSTS_DOWNVOTE: null,
  POSTS_UPVOTE_CACEL: null,
  POSTS_DOWNVOTE_CACEL: null,

  POSTS_VOTING_DONE: null,

  // Users
  LOGGED_IN: null,
  LOGGED_OUT: null,
  SET_SHARING: null,
  RESET_NUXES: null,

  // Folders
  LOADED_USER_FOLDERS: null,
  SELECTED_USER_FOLDER: null,
  ADDED_NEW_FOLDER_WITH_POST: null,

  // AppOverlay
  OVERLAY_MODEL_PUSH: null,
  OVERLAY_MODEL_DISMISS: null,

  // For dashboard
  DASHBOARD_EDIT_ALL_ROWS: null,
  DASHBOARD_EDIT_SINGLE_ROW: null,
  DASHBOARD_EDIT_SINGLE_ROW_CANCEL: null,

  TOGGLE_TABLE_ROW_CHECKBOX: null,
  TOGGLE_TABLE_ROW_ALL_CHECKBOXS: null,

  DASHBOARD_LOADED_PAGINATION: null,
  DASHBOARD_LOADED_TOPICS: null,
  DASHBOARD_RESET: null,

  // PostHome, PostDaily
  LIST_VIEW_LOADED_POSTS: null,
  LIST_VIEW_RESET_ALL_POSTS: null,

  // Detailed Posts
  OVERLAY_DETAILS_POSTS_DISMISS: null,
  OVERLAY_DETAILS_POSTS_PUSH: null,
  OVERLAY_DETAILS_POSTS_POP: null,
  OVERLAY_DETAILS_POSTS_EMPTY: null,
  OVERLAY_DETAILS_POSTS_BACKWARD: null,
  OVERLAY_DETAILS_POSTS_FORWARD: null,

  OVERLAY_LOADED_POSTS_PAGE: null,
  OVERLAY_LOADED_RELATED_POSTS: null,

  SET_PLATFORM: null,
  SET_VERSION: null,

  LOGIN_VIA_SOCIAL: null,

  ON_LOGIN_STATE_CHANGE: null,
  LOGOUT: null,

  ON_AUTH_FORM_FIELD_CHANGE: null,
  SIGNUP_REQUEST: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  SET_SESSION_TOKEN: null,

  RESET_PASSWORD_REQUEST: null,
  RESET_PASSWORD_SUCCESS: null,
  RESET_PASSWORD_FAILURE: null,

  GET_PROFILE_REQUEST: null,
  GET_PROFILE_SUCCESS: null,
  GET_PROFILE_FAILURE: null,

  ON_PROFILE_FORM_FIELD_CHANGE: null,

  PROFILE_UPDATE_REQUEST: null,
  PROFILE_UPDATE_SUCCESS: null,
  PROFILE_UPDATE_FAILURE: null,

  SET_STATE: null,
  GET_STATE: null,
  SET_STORE: null,

  FORGOT_PASSWORD: null,
  LOGIN: null,
  REGISTER: null,

  ON_SHIPMENT_FORM_FIELD_CHANGE: null,
  NEW_SHIPMENT: null,
  NEW_SHIPMENT_REQUEST: null,
  NEW_SHIPMENT_SUCCESS: null,
  NEW_SHIPMENT_FAILURE: null,

  GET_SHIPMENTS_REQUEST: null,
  GET_SHIPMENTS_SUCCESS: null,
  GET_SHIPMENTS_FAILURE: null,

  ON_SHIPMENT_SAVED: null

})
