
import axios from 'axios';
import React from 'react';
import Container from '../../../container/views/Container';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/IndeterminateLinear';
import CalendarHeatmap from 'react-calendar-heatmap';

export default class TimerLogView extends React.Component {

  constructor(props) {
    super(props);
    this.allTimeBarChart = React.createRef();
    this.yearStart = new Date(moment().add(-365, 'days').format('YYYY-MM-DD'));
    this.today = new Date(moment().format('YYYY-MM-DD'));
    this.heatMapClassForValue = this.heatMapClassForValue.bind(this);
  }

  componentDidMount() {
    this.timerId = this.getParameterByName('id');
    if (this.props.onMount) this.props.onMount(this.timerId);
    const ctx = this.allTimeBarChart.current.getContext('2d');
    const data = {
      labels: [],
      datasets: [{
        label: 'hours',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.75)'
      }]
    };
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          position: 'none'
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userTimerLogs &&
        prevProps.userTimerLogs !== this.props.userTimerLogs) {
      this.updateBarChart();
    }
  }

  updateBarChart() {
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
    let current = moment().add(-6, 'days');
    const today = moment();
    while (current && current.isSameOrBefore(today)) {
      const label = current.format('YYYY-MM-DD');
      labels.push(label);
      data.push(m[label] || 0);
      current.add(1, 'day');
    }
    this.barChart.data.labels = labels;
    this.barChart.data.datasets[0].data = data;
    this.barChart.update();
  }

  heatMapValues() {
    if (!this.props.userTimerLogs) return [];
    const m = new Map();
    let start, stop;
    this.props.userTimerLogs.forEach(log => {
      if (!start && log.action === 'start') {
        start = moment(log.time);
      } else if (start && log.action === 'stop') {
        stop = moment(log.time);
        let diff = moment.duration(stop.diff(start)).as('minutes');
        const label = log.time.slice(0, 10);
        m.set(label, diff);
        start = undefined;
      }
    });
    const data = [];
    this.heatMapLow = Number.MAX_VALUE;
    this.heatMapHigh = Number.MIN_VALUE;
    for (let kv of m) {
      this.heatMapLow = Math.min(this.heatMapLow, kv[1]);
      this.heatMapHigh = Math.max(this.heatMapHigh, kv[1]);
      data.push({
        date: kv[0],
        count: kv[1]
      });
    }
    return data;
  }

  heatMapClassForValue(value) {
    if (!value || !this.props || !this.props.userTimerLogs) return 'color-github-0';
    const low = this.heatMapLow;
    const high = this.heatMapHigh;
    const groupSize = (high-low) / 4;
    const g1 = low+groupSize;
    const g2 = low+groupSize*2;
    const g3 = low+groupSize*3;
    const { count } = value;
    if (count >= low && count < g1) return 'color-github-1';
    else if (count >= g1 && count < g2) return 'color-github-2';
    else if (count >= g2 && count < g3) return 'color-github-3';
    else if (count >= g3 && count <= high) return 'color-github-4';
  }

  renderLoading() {
    return this.props.loading && <Loading />;
  }

  render() {
    return (
      <Container>
        <div>
          <div className='row'>
            <h4>{this.timerId}</h4>
            {this.renderLoading()}
          </div>

          <div className='row'>
            <div className='col s12'>
              <h5>Last Year - Heat Map</h5>
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <CalendarHeatmap
                startDate={this.yearStart}
                endDate={this.today}
                values={this.heatMapValues()}
                classForValue={this.heatMapClassForValue}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <h5>This Week - Daily Hours</h5>
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <canvas ref={this.allTimeBarChart} height='80vh'></canvas>
            </div>
          </div>
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
