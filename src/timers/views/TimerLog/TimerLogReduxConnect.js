
import { connect } from 'react-redux'
import { getUserTimerLog, startTimer, stopTimer } from '../../state/timerActionCreators';

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
