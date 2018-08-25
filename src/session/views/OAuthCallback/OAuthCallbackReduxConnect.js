
import { connect } from 'react-redux'
import { establishSession } from '../../state/sessionActionCreators';

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(establishSession());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
