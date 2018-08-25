
import actions from './sessionActions';

const initialState = {
  authenticated: false
};

export default function AuthorizeReducer(state=initialState, action) {
  console.log('state before', state);
  console.log('action', action);
  if (action.type === actions.GET_SESSION) {
    return Object.assign({}, state, {
      authenticated: !!action.accessTokenExpiry,
      name: action.name,
      picture: action.picture
    });
  } else if (action.type === actions.LOG_OUT) {
    console.log('A');
    return Object.assign({}, initialState);
  } else {
    console.log('B');
    return state;
  }
  // switch (action.type) {
  //   case actions.GET_SESSION:
  //     return Object.assign({}, state, {
  //       authenticated: !!action.accessTokenExpiry,
  //       name: action.name,
  //       picture: action.picture
  //     });
  //   case action.LOG_OUT:
  //     console.log('A');
  //     return Object.assign({}, initialState);
  //   default:
  //     console.log('B');
  //     return state;
  // }
}
