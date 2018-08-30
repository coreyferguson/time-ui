
import { connect } from 'react-redux'
import { getUserTimer, saveTimer } from '../../state/timerActionCreators';

const mapStateToProps = ({ timer }) => timer;

const mapDispatchToProps = dispatch => {
  return {
    onMount: timerId => {
      dispatch(getUserTimer(timerId));
    },
    onSubmit: data => {
      dispatch(saveTimer(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
