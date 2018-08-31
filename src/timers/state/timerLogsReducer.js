
import actions from './timerActions';

const initialState = {
  loading: false,
  error: false,
  userTimerLogs: undefined
};

export default function TimerLogsReducer(state=initialState, action) {
  if (action.type === actions.GET_TIMER_LOGS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === actions.GET_TIMER_LOGS_RESPONSE) {
    return Object.assign({}, state, {
      loading: false,
      error: false,
      userTimerLogs: action.userTimerLogs
    });
  } else if (action.type === actions.GET_TIMER_LOGS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  } else {
    return state;
  }
}
