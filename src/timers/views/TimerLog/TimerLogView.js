
import axios from 'axios';
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/IndeterminateLinear';
// import Chart from 'chart.js';
// import moment from 'moment';

export default class TimerLogView extends React.Component {

  constructor(props) {
    super(props);
    this.heatMap = React.createRef();
  }

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
    const ctx = this.heatMap.current.getContext('2d');
    const data = {
      labels: [],
      datasets: [{
        label: 'Hours',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.75)'
      }]
    };
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userTimerLogs && prevProps.userTimerLogs !== this.props.userTimerLogs) {
      const m = {};
      let first;
      this.props.userTimerLogs.forEach(log => {
        if (!start && log.action === 'start') {
          start = moment(log.time);
        } else if (start && log.action === 'stop') {
          stop = moment(log.time);
          let diff = moment.duration(stop.diff(start)).as('hours');
          const label = log.time.slice(0, 10);
          m[label] = diff;
          start = undefined;
          if (!first) first = moment(label);
        }
      });
      const labels = [];
      const data = [];
      let start, stop;
      let current = first;
      const today = moment();
      while (current.isBefore(today)) {
        const label = current.format('YYYY-MM-DD');
        labels.push(label);
        data.push(m[label] || 0);
        current.add(1, 'day');
      }
      this.barChart.data.labels = labels;
      this.barChart.data.datasets[0].data = data;
      this.barChart.update();
    }
  }

  renderLoading() {
    return this.props.loading && <Loading />;
  }

  render() {
    return (
      <Container>
        <div>
          <h1>Timer Log</h1>
          {this.renderLoading()}
          <canvas ref={this.heatMap} width="100%" height="30%"></canvas>
        </div>
      </Container>
    );
  }

}

TimerLogView.propTypes = {
  onMount: PropTypes.func.isRequired
};
