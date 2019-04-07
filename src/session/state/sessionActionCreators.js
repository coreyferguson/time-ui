
import actions from './sessionActions';
import auth0 from 'auth0-js';
import config from 'config';
import moment from 'moment';

var webAuth = new auth0.WebAuth({
  domain: 'overattribution.auth0.com',
  clientID: '4YJ6HJ83DiJMetHB3QPVPHG1mDAVs7vh',
  responseType: 'token id_token',
  audience: 'https://time.overattribution.com',
  scope: 'openid profile'
});

export function getSession() {
  return dispatch => {
    if (!isRecognizedUser()) {
      dispatch({ type: actions.UNRECOGNIZED_USER });
    } else if (isExpired()) {
      dispatch({ type: actions.UNAUTHENTICATED });
    } else {
      dispatch({
        type: actions.AUTHENTICATED,
        name: localStorage.getItem('oauth_user_name'),
        picture: localStorage.getItem('oauth_user_picture')
      });
    }
  }
}

export function establishSession() {
  return dispatch => webAuth.parseHash(
    (err, authResult) => _parseHash(err, authResult, dispatch));
}

export function _parseHash(err, authResult, dispatch) {
  if (authResult && authResult.accessToken && authResult.idToken) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('oauth_access_token', authResult.accessToken);
    localStorage.setItem('oauth_id_token', authResult.idToken);
    localStorage.setItem('oauth_expires_at', expiresAt);
    localStorage.setItem('oauth_user_name', authResult.idTokenPayload.given_name);
    localStorage.setItem('oauth_user_picture', authResult.idTokenPayload.picture);
    localStorage.setItem('is_recognized_user', true);
    dispatch(getSession());
    const redirectUri = localStorage.getItem('oauth_redirect_uri');
    if (config.env !== 'test' && redirectUri) {
      window.history.replaceState({}, null, redirectUri);
      window.location.reload();
    }
  } else {
    dispatch(logOut());
  }
}

export function logOut() {
  clearLocalStorage();
  if (config.env !== 'test') window.location.href = '/';
  return {
    type: actions.LOG_OUT
  };
}

export function logIn() {
  clearLocalStorage();
  localStorage.setItem('oauth_redirect_uri', window.location.href);
  webAuth.authorize({ redirectUri: config.oauth_callback_uri });
  return {
    type: actions.LOG_IN
  };
}

function isAuthenticated() {
  return !!localStorage.getItem('oauth_access_token');
}

/**
 * Unrecognized users are those without any session credentials
 * (even expired credentials).
 */
function isRecognizedUser() {
  return !!localStorage.getItem('is_recognized_user');
}

/**
 * Local storage variables exist but session is now expired.
 */
function isExpired() {
  const expiryString = localStorage.getItem('oauth_expires_at');
  if (!expiryString) return true;
  // Check whether the current time is past the
  // Access Token's expiry time
  const expiry = moment(parseInt(expiryString, 10));
  const now = moment();
  return now.isAfter(expiry);
}

function clearLocalStorage() {
  localStorage.removeItem('oauth_access_token');
  localStorage.removeItem('oauth_id_token');
  localStorage.removeItem('oauth_expires_at');
  localStorage.removeItem('oauth_user_name');
  localStorage.removeItem('oauth_user_picture');
  localStorage.removeItem('oauth_redirect_uri');
}
