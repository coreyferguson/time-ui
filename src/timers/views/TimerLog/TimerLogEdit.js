
import React from 'react';
import PropTypes from 'prop-types';

export default class TimerLogEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.handleEditTimerLog = this.handleEditTimerLog.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }

  handleEditTimerLog() {
    this.setState({
      editMode: true,
      time: ''
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onEditLog(this.state.time);
    this.setState({
      editMode: false,
      time: ''
    });
  }

  handleCancel() {
    this.setState({ editMode: false });
  }

  renderEditIcon() {
    return (
      <a onClick={this.handleEditTimerLog}>
        <i className='timer-log-action-item material-icons grey-text'>edit</i>
      </a>
    );
  }

  renderEditForm() {
    return (
      <form onSubmit={this.handleSubmit}>
          <div className='input-field inline'>
            <input onChange={this.handleTimeChange} id='time' type='text' className='validate' />
          </div>
          <button className='btn-small waves-effect waves-light' type='submit'>Save</button>
          <a onClick={this.handleCancel} className='btn-small waves-effect waves-light'>Cancel</a>
      </form>
    );
  }

  render() {
    return this.state.editMode ? this.renderEditForm() : this.renderEditIcon();
  }

}

TimerLogEdit.propTypes = {
  onEditLog: PropTypes.func.isRequired
};
