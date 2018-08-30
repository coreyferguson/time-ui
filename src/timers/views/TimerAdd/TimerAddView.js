
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';

export default class TimerAddView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timerIdValidity: '',
      timerId: '',
      timerNameValidity: '',
      timerName: '',
      formValid: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimerIdChange = this.handleTimerIdChange.bind(this);
    this.handleTimerNameChange = this.handleTimerNameChange.bind(this);
  }

  isTimerIdValid(timerId) {
    return timerId.length > 0 && timerId.indexOf(' ') === -1;
  }

  isTimerNameValid(timerName) {
    return timerName.length > 0;
  }

  validate(newState) {
    const state = Object.assign({}, this.state, newState);
    const isTimerIdValid = this.isTimerIdValid(state.timerId);
    const isTimerNameValid = this.isTimerNameValid(state.timerName);
    this.setState({
      timerIdValidity: isTimerIdValid ? 'valid' : 'invalid',
      timerNameValidity: isTimerNameValid ? 'valid' : 'invalid',
      formValid: isTimerIdValid && isTimerNameValid
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      id: this.state.timerId,
      name: this.state.timerName
    });
  }

  handleTimerIdChange(event) {
    const timerId = event.target.value;
    const newState = { timerId };
    this.setState(newState);
    this.validate(newState);
  }

  handleTimerNameChange(event) {
    const timerName = event.target.value;
    const newState = { timerName };
    this.setState(newState);
    this.validate(newState);
  }

  renderLoading() {
    return this.props.loading && (
      <div className='progress'>
        <div className='indeterminate'></div>
      </div>
    );
  }

  renderError() {
    return this.props.error && (
      <div className='card-panel red lighten-2 valign-wrapper' style={{marginBottom: '2em'}}>
        <i className='material-icons small' style={{marginRight: '5px'}}>error</i>
        <p>Unknown error from server. Please try again.</p>
      </div>
    );
  }

  render() {
    const isFormSubmitDisabled = !this.state.formValid || this.props.loading;
    return (
      <Container>
        <div>
          <h1>New Timer</h1>
          {this.renderLoading()}
          {this.renderError()}
          <form onSubmit={this.handleSubmit}>
            <div className='input-field'>
              <label htmlFor='timer_id'>Timer Id</label>
              <input
                type='text'
                id='timer_id'
                onChange={this.handleTimerIdChange}
                className={this.state.timerIdValidity}
                autoComplete='off' />
            </div>
            <div className='input-field'>
              <label htmlFor='timer_name'>Timer Name</label>
              <input
                type='text'
                id='timer_name'
                onChange={this.handleTimerNameChange}
                className={this.state.timerNameValidity}
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
        </div>
      </Container>
    );
  }

}

TimerAddView.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
