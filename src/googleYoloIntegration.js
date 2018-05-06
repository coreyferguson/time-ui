window.onGoogleYoloLoad = (googleyolo) => {
  const retrievePromise = googleyolo.retrieve({
    supportedAuthMethods: ['https://accounts.google.com'],
    supportedIdTokenProviders: [
      {
        uri: 'https://accounts.google.com',
        clientId: '443828965425-t3v4iklfup671bkbdmsulklq59eopatg.apps.googleusercontent.com'
      }
    ]
  }).then(credentials => {
    console.log('success', credentials);
    if (credentials.idToken)
      return window.verifyIdToken(credentials.idToken);
  }, error => {
    console.log('error', error);
    if (error.type === 'noCredentialsAvailable') {
      return googleyolo.hint({
        supportedAuthMethods: ['https://accounts.google.com'],
        supportedIdTokenProviders: [
          {
            uri: 'https://accounts.google.com',
            clientId: '443828965425-t3v4iklfup671bkbdmsulklq59eopatg.apps.googleusercontent.com'
          }
        ]
      }).then(credentials => {
        console.log('success', credentials);
        if (credentials.idToken)
          return window.verifyIdToken(credentials.idToken);
      }, error => {
        console.log('error 2', error);
        switch (error.type) {
          case 'userCanceled':
            // The user closed the hint selector. Depending on the desired UX,
            // request manual sign up or do nothing.
            break;
          case 'noCredentialsAvailable':
            // No hint available for the session. Depending on the desired UX,
            // request manual sign up or do nothing.
            break;
          case 'requestFailed':
            // The request failed, most likely because of a timeout.
            // You can retry another time if necessary.
            break;
          case 'operationCanceled':
            // The operation was programmatically canceled, do nothing.
            break;
          case 'illegalConcurrentRequest':
            // Another operation is pending, this one was aborted.
            break;
          case 'initializationError':
            // Failed to initialize. Refer to error.message for debugging.
            break;
          case 'configurationError':
            // Configuration error. Refer to error.message for debugging.
            break;
          default:
            // Unknown error, do nothing.
        }
      });
    }
  });
};

window.verifyIdToken = idToken => {
  return axios({
    method: 'POST',
    url: 'https://time-api.overattribution.com/auth/verifyIdToken',
    data: { idToken }
  });
};
