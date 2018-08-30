
import { connect } from 'react-redux'
import { getUserTimers } from '../../state/timerActionCreators';

const mapStateToProps = ({ timers }) => timers;

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(getUserTimers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
