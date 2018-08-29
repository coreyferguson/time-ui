
import { connect } from 'react-redux'

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps);
