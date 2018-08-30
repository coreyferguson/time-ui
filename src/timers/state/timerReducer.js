
import actions from './timerActions';

const initialState = {
  loading: false,
  error: false,
  userTimer: undefined
};

export default function TimerReducer(state=initialState, action) {
  if (action.type === actions.GET_TIMER_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === actions.GET_TIMER_RESPONSE) {
    return Object.assign({}, state, {
      loading: false,
      error: false,
      userTimer: action.userTimer
    });
  } else if (action.type === actions.GET_TIMER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  } else if (action.type === actions.SAVE_TIMER_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === actions.SAVE_TIMER_RESPONSE) {
    return Object.assign({}, state, {
      loading: false,
      error: false,
      userTimer: Object.assign({}, state.userTimer, action.userTimer)
    });
  } else if (action.type === actions.SAVE_TIMER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  } else {
    return state;
  }
}
