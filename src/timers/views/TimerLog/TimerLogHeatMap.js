
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './heatMapStyles.scss';

function generateMetadata(userTimerLogs) {
  const metadata = {
    map: new Map(),
    data: [],
    userTimerLogs
  };
  if (!userTimerLogs) return metadata;
  // generate map
  const m = new Map();
  let start, stop;
  userTimerLogs.forEach(log => {
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
  metadata.map = m;
  // generate data + high and low thresholds
  const data = [];
  let heatMapLow = Number.MAX_VALUE;
  let heatMapHigh = Number.MIN_VALUE;
  for (let kv of m) {
    heatMapLow = Math.min(heatMapLow, kv[1]);
    heatMapHigh = Math.max(heatMapHigh, kv[1]);
    data.push({
      date: kv[0],
      count: kv[1]
    });
  }
  metadata.data = data;
  metadata.low = heatMapLow;
  metadata.high = heatMapHigh;
  return metadata;
}

function heatMapClassForValueGenerator(metadata) {
  return value => {
    if (!value || !metadata.userTimerLogs) return 'color-0';
    const low = metadata.low;
    const high = metadata.high;
    const groupSize = (high-low) / 4;
    const g1 = low+groupSize;
    const g2 = low+groupSize*2;
    const g3 = low+groupSize*3;
    const { count } = value;
    if (count >= low && count < g1) return 'color-1';
    else if (count >= g1 && count < g2) return 'color-2';
    else if (count >= g2 && count < g3) return 'color-3';
    else if (count >= g3 && count <= high) return 'color-4';
  };
}

export default function TimerLogHeatMap(props) {
  const yearStart = new Date(moment().add(-365, 'days').format('YYYY-MM-DD'));
  const today = new Date(moment().format('YYYY-MM-DD'));
  const metadata = generateMetadata(props.userTimerLogs);
  const heatMapClassForValue = heatMapClassForValueGenerator(metadata);
  return (
    <CalendarHeatmap
      startDate={yearStart}
      endDate={today}
      values={metadata.data}
      classForValue={heatMapClassForValue}
    />
  );
}
