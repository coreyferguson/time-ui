
import { connect } from 'react-redux'
import { getSession } from '../../../session/state/sessionActionCreators';

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(getSession());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
