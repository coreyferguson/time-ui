
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/IndeterminateLinear';
import TimerLogHeatMap from './TimerLogHeatMap';
import TimerLogWeekBarChart from './TimerLogWeekBarChart';
import TimerLogLongestStreak from './TimerLogLongestStreak';
import TimerLogLatestEntries from './TimerLogLatestEntries';
import TimerLogTotalHours from './TimerLogTotalHours';
import './TimerLogView.scss';

export default class TimerLogView extends React.Component {

  constructor(props) {
    super(props);
  }

  renderLoading() {
    return this.props.loading && <Loading />;
  }

  componentDidMount() {
    this.timerId = this.getParameterByName('id');
    if (this.props.onMount) this.props.onMount(this.timerId);
  }

  render() {
    return (
      <Container>
        <div className='timer-log'>
          <div className='row'>
            <h4 className='title'>
              <span className='timer-id'>{this.timerId}</span>
              <a href={`/edittimer?id=${this.timerId}`}>
                <i className="material-icons">edit</i>
              </a>
            </h4>
            {this.renderLoading()}
          </div>

          <div className='row'>
            <div className='col s12'>
              <h5>Last Year</h5>
            </div>
          </div>
          <TimerLogHeatMap userTimerLogs={this.props.userTimerLogs} />
          <TimerLogLongestStreak userTimerLogs={this.props.userTimerLogs} />
          <TimerLogTotalHours userTimerLogs={this.props.userTimerLogs} />

          <div className='row'>
            <div className='col s12'>
              <h5>Last Week</h5>
            </div>
          </div>
          <TimerLogWeekBarChart userTimerLogs={this.props.userTimerLogs} />

          <TimerLogLatestEntries userTimerLogs={this.props.userTimerLogs} />

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
  onMount: PropTypes.func.isRequired
};
