
import { connect } from 'react-redux'
import { getSession, logOut, logIn } from '../../../session/state/sessionActionCreators';

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(getSession());
    },
    onLogOut: () => {
      dispatch(logOut());
    },
    onLogIn: () => {
      dispatch(logIn());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
