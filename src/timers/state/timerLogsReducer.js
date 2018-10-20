
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
  } else if (action.type === actions.DELETE_TIMER_LOG_REQUEST) {
    return Object.assign({}, state, {
      userTimerLogs: state.userTimerLogs.filter(log => {
        return log.time !== action.time;
      })
    });
  } else if (action.type === actions.EDIT_TIMER_LOG_REQUEST) {
    const logs = state.userTimerLogs.map(log => {
      const newLog = Object.assign({}, log);
      if (log.time === action.log.time) newLog.time = action.newTime;
      return newLog;
    });
    logs.sort((a, b) => a.time > b.time);
    return Object.assign({}, state, { userTimerLogs: logs });
  } else if (action.type === actions.DELETE_TIMER_LOG_ERROR) {
    return Object.assign({}, state, { error: true });
  } else if (action.type === actions.SAVE_TIMER_LOG_ERROR) {
    return Object.assign({}, state, { error: true });
  } else {
    return state;
  }
}
