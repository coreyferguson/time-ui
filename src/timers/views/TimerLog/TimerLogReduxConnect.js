
import { connect } from 'react-redux'
import { getUserTimerLog } from '../../state/timerActionCreators';

const mapStateToProps = ({ timerLogs }) => timerLogs;

const mapDispatchToProps = dispatch => {
  return {
    onMount: timerId => {
      dispatch(getUserTimerLog(timerId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
