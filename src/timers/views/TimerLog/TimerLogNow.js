
import React from 'react';
import timerLogsToTimeSpent from './timerLogsToTimeSpent';
import './TimerLogNow.scss';
import PropTypes from 'prop-types';

export default class TimerLogNow extends React.Component {

  constructor(props) {
    super(props);
    this.staticTimeSpentToday = moment.duration(0, 'seconds');
    this.state = {
      timeRunning: undefined
    };
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handleStopTimer = this.handleStopTimer.bind(this);
  }

  componentDidMount() {
    this.recurseRefresh();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userTimerLogs !== nextProps.userTimerLogs) {
      const todayString = format(moment());
      const md = timerLogsToTimeSpent(nextProps.userTimerLogs);
      this.staticTimeSpentToday = moment.duration(md.map.get(todayString), 'minutes');
      this.refresh(nextProps);
    }
  }

  handleStartTimer() {
    this.props.onStartTimer();
  }

  handleStopTimer() {
    this.props.onStopTimer();
  }

  recurseRefresh() {
    this.timeout = setTimeout(this.recurseRefresh.bind(this), 1000);
    this.refresh();
  }

  refresh(props) {
    props = props || this.props;
    const logs = props.userTimerLogs;
    const lastStartTime = moment(getLastStartTime(logs));
    const timeRunning = moment().diff(lastStartTime);
    const d = moment.duration(timeRunning, 'milliseconds');
    d.add(this.staticTimeSpentToday);
    this.setState({ timeRunning: formatDuration(d) });
  }

  renderRunningTimer() {
    const logs = this.props.userTimerLogs;
    const enabled = this.props.isControlsEnabled ? '' : 'disabled';
    return (
      isTimerRunning(logs) &&
      <div className="card-panel center-align">
        <span>
          <p className='title grey-text text-darken-2'>Timer Currently Running</p>
          <p className='value'>{this.state.timeRunning}</p>
          {
            this.props.isControlsShown &&
            <a
                className={`btn ${enabled}`}
                onClick={this.handleStopTimer}>
              Stop Timer
            </a>
          }
        </span>
      </div>
    );
  }

  renderStoppedTimer() {
    const logs = this.props.userTimerLogs;
    const enabled = this.props.isControlsEnabled ? '' : 'disabled';
    return (
      !isTimerRunning(logs) &&
      <div className="card-panel center-align">
        <span>
          <p className='title grey-text text-darken-2'>Time Spent Today</p>
          <p className='value'>{formatDuration(this.staticTimeSpentToday)}</p>
          {
            this.props.isControlsShown &&
            <a className={`btn ${enabled}`}
                onClick={this.handleStartTimer}>
              Start Timer
            </a>
          }
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className='timer-log-now'>
        <div className='row'>
          <div className='col s12'>
            {this.renderRunningTimer()}
            {this.renderStoppedTimer()}
          </div>
        </div>
      </div>
    );
  }
}

TimerLogNow.propTypes = {
  // TODO: userTimerLogs : PropTypes.shape({...})
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  isControlsShown: PropTypes.bool.isRequired,
  isControlsEnabled: PropTypes.bool.isRequired
}

function isTimerRunning(logs) {
  return logs && logs.length > 0 && logs[logs.length-1].action === 'start';
}

function format(date) {
  return moment(date).format('YYYY-MM-DD');
}

function formatDuration(d) {
  const h = d.get('hours');
  const m = d.get('minutes');
  const s = d.get('seconds');
  const output =
    ((h > 0) ? `${h}h ` : '') +        // hours
    (h > 0 || m > 0 ? `${m}m ` : '') + // minutes
    ((h === 0 && m === 0) || s !== 0 ? `${s}s` : '');   // seconds
  return output;
}

function getLastStartTime(logs) {
  if (!logs || logs.length === 0 || logs[logs.length-1].action === 'stop') {
    return undefined;
  } else {
    return logs[logs.length-1].time;
  }
}
