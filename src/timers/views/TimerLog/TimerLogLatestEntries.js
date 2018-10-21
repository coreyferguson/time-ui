
import moment from 'moment';
import './TimerLogLatestEntries.scss';
import PropTypes from 'prop-types';
import React from 'react';
import TimerLogEdit from './TimerLogEdit';

export default class TimerLogLatestEntries extends React.Component {

  constructor(props) {
    super(props);
    this.handleDeleteLog = this.handleDeleteLog.bind(this);
    this.handleEditLog = this.handleEditLog.bind(this);
  }

  render() {
    return (
      <div className='timer-log-latest-entries row'>
        <div className='col s12'>
          <h5>Last 20 Logs</h5>
          <table className='striped'>
            <thead>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.userTimerLogs &&
                this.props.userTimerLogs.slice(-20).reverse().map(entry =>
                  <tr key={entry.time}>
                    <td>
                      {
                        entry.action === 'start'
                          ? <i className='material-icons green-text text-lighten-2'>play_arrow</i>
                          : <i className='material-icons red-text text-lighten-2'>stop</i>
                      }
                    </td>
                    <td>{moment(entry.time).format('MMM D, YYYY (ddd)')}</td>
                    <td>{moment(entry.time).format('h:mm a')}</td>
                    <td>
                      <a onClick={() => this.handleDeleteLog(entry) }>
                        <i className='timer-log-action-item material-icons grey-text pointer'>delete</i>
                      </a>
                      <TimerLogEdit onEditLog={newTime => this.handleEditLog(entry, newTime)} />
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  handleDeleteLog(entry) {
    const confirmed = confirm('Are you sure?');
    if (confirmed) this.props.onDeleteLog(entry.time);
  }

  handleEditLog(entry, newTime) {
    const confirmed = confirm('Are you sure?');
    if (confirmed) this.props.onEditLog(entry, newTime);
  }

}

TimerLogLatestEntries.propTypes = {
  onDeleteLog: PropTypes.func.isRequired,
  onEditLog: PropTypes.func.isRequired
}
