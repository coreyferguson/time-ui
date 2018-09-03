
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/IndeterminateLinear';
import UnknownServerError from '../../../Error/UnknownServerError';

export default class TimerEditView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timerName: '',
      timerNameValidity: '',
      formValid: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimerNameChange = this.handleTimerNameChange.bind(this);
  }

  componentDidMount() {
    const timerId = this.getParameterByName('id');
    if (this.props.onMount) this.props.onMount(timerId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userTimer != this.props.userTimer) {
      this.setState({
        timerName: this.props.userTimer.name
      });
    }
  }

  isTimerNameValid(timerName) {
    return timerName.length > 0;
  }

  validate(newState) {
    const state = Object.assign({}, this.state, newState);
    const isTimerNameValid = this.isTimerNameValid(state.timerName);
    this.setState({
      timerNameValidity: isTimerNameValid ? 'valid' : 'invalid',
      formValid: isTimerNameValid
    });
  }

  handleTimerNameChange(event) {
    const timerName = event.target.value;
    const newState = { timerName };
    this.setState(newState);
    this.validate(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      timerId: this.props.userTimer.timerId,
      name: this.state.timerName
    });
  }

  renderError() {
    return this.props.error && <UnknownServerError />;
  }

  renderLoading() {
    return this.props.loading && <Loading />;
  }

  renderEditTimer() {
    const isFormSubmitDisabled = !this.state.formValid || this.props.loading;
    return !this.props.loading && this.props.userTimer && (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='timer_id'>Timer Id</label>
        <div className='input-field'>
          <input
            type='text'
            disabled='disabled'
            defaultValue={this.props.userTimer.timerId} />
        </div>
        <label htmlFor='timer_name'>Timer Name</label>
        <div className='input-field'>
          <input
            type='text'
            id='timer_name'
            onChange={this.handleTimerNameChange}
            className={this.state.timerNameValidity}
            defaultValue={this.props.userTimer.name}
            autoComplete='off' />
        </div>
        <button
            className={`btn waves-effect waves-light ${isFormSubmitDisabled ? 'disabled' : ''}`}
            type='submit'
            name='action'>
          <i className='material-icons right'>send</i>
          Submit
        </button>
      </form>
    );
  }

  render() {
    return (
      <Container>
        <div>
          {this.renderError()}
          <h4>Timer</h4>
          {this.renderLoading()}
          {this.renderEditTimer()}
        </div>
      </Container>
    );
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

}

TimerEditView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired
};
