
import actions from './sessionActions';

const initialState = {
  isRecognized: false,
  isAuthenticated: false
};

export default function SessionReducer(state=initialState, action) {
  if (action.type === actions.UNRECOGNIZED_USER) {
    return { isRecognized: false, isAuthenticated: false };
  } else if (action.type === actions.UNAUTHENTICATED) {
    return { isRecognized: true, isAuthenticated: false };
  } else if (action.type === actions.AUTHENTICATED) {
    return {
      isRecognized: true,
      isAuthenticated: true,
      name: action.name,
      picture: action.picture
    };
  } else {
    return state;
  }
}
