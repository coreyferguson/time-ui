
import { connect } from 'react-redux'
import { getUserTimers } from '../../state/timerActionCreators';

const mapStateToProps = ({ timer }) => timer;

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(getUserTimers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
