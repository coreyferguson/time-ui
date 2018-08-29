
import { combineReducers } from 'redux';
import session from './session/state/sessionReducer';
import timer from './timers/state/timerReducer';

export default combineReducers({
  session, timer
});
