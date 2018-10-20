
import { connect } from 'react-redux'
import {
  getUserTimerLog,
  startTimer,
  stopTimer,
  deleteLog,
  editLog
} from '../../state/timerActionCreators';

const mapStateToProps = ({ timer, timerLogs }) => {
  return { timer, timerLogs };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartTimer: timerId => {
      dispatch(startTimer(timerId));
    },
    onStopTimer: timerId => {
      dispatch(stopTimer(timerId));
    },
    onMount: timerId => {
      dispatch(getUserTimerLog(timerId));
    },
    onDeleteLog: (timerId, time) => {
      dispatch(deleteLog(timerId, time));
    },
    onEditLog: (log, newTime) => {
      dispatch(editLog(log, newTime));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
