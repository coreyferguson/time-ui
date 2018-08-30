
import { combineReducers } from 'redux';
import session from './session/state/sessionReducer';
import timers from './timers/state/timersReducer';
import timer from './timers/state/timerReducer';

export default combineReducers({
  session, timers, timer
});
