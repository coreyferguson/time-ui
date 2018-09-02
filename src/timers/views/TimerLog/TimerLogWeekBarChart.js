
import React from 'react';

export default class TimerLogWeekBarChart extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d');
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
        },
        tooltips: {
          callbacks: {
            label: (toolTipItem, data) => {
              const { datasetIndex, index } = toolTipItem;
              const hours = data.datasets[datasetIndex].data[index];
              const duration = moment.duration(hours, 'hours');
              return `${duration.get('hours')}h ${duration.get('minutes')}m`;
            }
          }
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

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col s12'>
            <canvas ref={this.canvas} height='80vh'></canvas>
          </div>
        </div>
      </div>
    );
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
        const label = moment(log.time).format('YYYY-MM-DD');
        m[label] = m[label]+diff || diff;
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
      const key = current.format('YYYY-MM-DD');
      const barChartLabel = current.format('ddd');
      labels.push(barChartLabel);
      data.push(m[key] || 0);
      current.add(1, 'day');
    }
    this.barChart.data.labels = labels;
    this.barChart.data.datasets[0].data = data;
    this.barChart.update();
  }

}
