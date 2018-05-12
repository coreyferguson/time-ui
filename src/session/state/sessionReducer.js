
import actions from './sessionActions';

const initialState = {
  loading: true,
  authenticated: false,
  data: {}
};

export default function AuthorizeReducer(state=initialState, action) {
  switch (action.type) {
    case actions.GET_SESSION_REQUEST:
      return Object.assign({}, state, {
        authenticated: state.data.user != null,
        loading: true
      });
    case actions.GET_SESSION_RESPONSE:
      return Object.assign({}, state, {
        loading: false,
        authenticated: action.session.user != null,
        data: action.session
      });
    default:
      return state;
  }
}
