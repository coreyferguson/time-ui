
import actions from './sessionActions';

const initialState = {
  authenticated: false
};

export default function SessionReducer(state=initialState, action) {
  if (action.type === actions.GET_SESSION) {
    return Object.assign({}, state, {
      authenticated: action.authenticated,
      name: action.name,
      picture: action.picture
    });
  } else if (action.type === actions.LOG_OUT) {
    return Object.assign({}, initialState);
  } else {
    return state;
  }
}
