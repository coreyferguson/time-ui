
import actions from './sessionActions';
import auth0 from 'auth0-js';
import config from 'config';

var webAuth = new auth0.WebAuth({
  domain: 'overattribution.auth0.com',
  clientID: '4YJ6HJ83DiJMetHB3QPVPHG1mDAVs7vh',
  responseType: 'token id_token',
  audience: 'https://time.overattribution.com',
  scope: 'openid profile'
});

export function getSession() {
  return {
    type: actions.GET_SESSION,
    authenticated: isAuthenticated(),
    accessTokenExpiry: localStorage.getItem('expires_at'),
    name: localStorage.getItem('user_name'),
    picture: localStorage.getItem('user_picture')
  };
}

export function establishSession() {
  return dispatch => {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('user_name', authResult.idTokenPayload.given_name);
        localStorage.setItem('user_picture', authResult.idTokenPayload.picture);
        dispatch(getSession());
        const redirectUri = localStorage.getItem('auth_redirect_uri');
        if (redirectUri) window.location.href = redirectUri;
      } else {
        dispatch(logOut());
      }
    });
  };
}

export function logOut() {
  clearLocalStorage();
  return {
    type: actions.LOG_OUT
  };
}

export function logIn() {
  clearLocalStorage();
  localStorage.setItem('auth_redirect_uri', window.location.href);
  webAuth.authorize({ redirectUri: config.oauth_callback_uri });
  return {
    type: actions.LOG_IN
  };
}

function isAuthenticated() {
  const expiry = localStorage.getItem('expires_at');
  if (!expiry) return false;
  // Check whether the current time is past the
  // Access Token's expiry time
  return new Date().getTime() < JSON.parse(expiry);
}

function clearLocalStorage() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_picture');
  localStorage.removeItem('auth_redirect_uri');
}
