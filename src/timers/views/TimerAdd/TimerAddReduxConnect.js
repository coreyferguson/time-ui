
import { connect } from 'react-redux'
import { saveTimer } from '../../state/timerActionCreators';

const mapStateToProps = ({ timer }) => timer;

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data => {
      dispatch(saveTimer(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
