
import actions from './timerActions';

const initialState = {
  loading: false,
  error: false,
  userTimers: undefined
};

export default function TimersReducer(state=initialState, action) {
  if (action.type === actions.GET_TIMERS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === actions.GET_TIMERS_RESPONSE) {
    return Object.assign({}, state, {
      loading: false,
      error: false,
      userTimers: action.userTimers
    });
  } else if (action.type === actions.GET_TIMERS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  } else {
    return state;
  }
}
