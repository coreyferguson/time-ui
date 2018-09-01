
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/IndeterminateLinear';
import TimerLogHeatMap from './TimerLogHeatMap';
import TimerLogWeekBarChart from './TimerLogWeekBarChart';
import TimerLogLongestStreak from './TimerLogLongestStreak';

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
        <div>
          <div className='row'>
            <h4>{this.timerId}</h4>
            {this.renderLoading()}
          </div>
          <TimerLogHeatMap userTimerLogs={this.props.userTimerLogs} />
          <TimerLogLongestStreak userTimerLogs={this.props.userTimerLogs} />
          <TimerLogWeekBarChart userTimerLogs={this.props.userTimerLogs} />
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
