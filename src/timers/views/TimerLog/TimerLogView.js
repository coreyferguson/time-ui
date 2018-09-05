
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/IndeterminateLinear';
import TimerLogNow from './TimerLogNow';
import TimerLogHeatMap from './TimerLogHeatMap';
import TimerLogWeekBarChart from './TimerLogWeekBarChart';
import TimerLogLongestStreak from './TimerLogLongestStreak';
import TimerLogLatestEntries from './TimerLogLatestEntries';
import TimerLogTotalHours from './TimerLogTotalHours';
import UnknownServerError from '../../../Error/UnknownServerError';
import './TimerLogView.scss';

export default class TimerLogView extends React.Component {

  constructor(props) {
    super(props);
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handleStopTimer = this.handleStopTimer.bind(this);
  }

  handleStartTimer() {
    this.props.onStartTimer(this.timerId);
  }

  handleStopTimer() {
    this.props.onStopTimer(this.timerId);
  }

  renderError() {
    return (this.props.timerLogs.error || this.props.timer.error) &&
      <UnknownServerError />;
  }

  renderLoading() {
    return (this.props.timerLogs.loading || this.props.timer.loading) && <Loading />;
  }

  componentDidMount() {
    this.timerId = this.getParameterByName('id');
    if (this.props.onMount) this.props.onMount(this.timerId);
  }

  render() {
    return (
      <Container>
        <div className='timer-log'>
          {this.renderError()}
          <div className='row'>
            <h4 className='title'>
              <span className='timer-id'>{this.timerId}</span>
              <a href={`/edittimer?id=${this.timerId}`}>
                <i className="material-icons">edit</i>
              </a>
            </h4>
            {this.renderLoading()}
          </div>

          <TimerLogNow
            userTimerLogs={this.props.timerLogs.userTimerLogs}
            onStartTimer={this.handleStartTimer}
            onStopTimer={this.handleStopTimer}
            isControlsShown={!this.props.timerLogs.loading}
            isControlsEnabled={!this.props.timer.loading} />
          <TimerLogLongestStreak userTimerLogs={this.props.timerLogs.userTimerLogs} />

          <div className='row'>
            <div className='col s12'>
              <h5>Last Year</h5>
            </div>
          </div>
          <TimerLogHeatMap userTimerLogs={this.props.timerLogs.userTimerLogs} />
          <TimerLogTotalHours userTimerLogs={this.props.timerLogs.userTimerLogs} />

          <div className='row'>
            <div className='col s12'>
              <h5>Last Week</h5>
            </div>
          </div>
          <TimerLogWeekBarChart userTimerLogs={this.props.timerLogs.userTimerLogs} />

          <TimerLogLatestEntries userTimerLogs={this.props.timerLogs.userTimerLogs} />

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

TimerLogView.propTypes = {
  onMount: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired
};
