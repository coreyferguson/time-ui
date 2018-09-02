
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './heatMapStyles.scss';
import moment from 'moment';
import timerLogsToTimeSpent from './timerLogsToTimeSpent';

export default function TimerLogHeatMap(props) {
  const yearStart = new Date(moment().add(-365, 'days').format('YYYY-MM-DD'));
  const today = new Date();
  const metadata = timerLogsToTimeSpent(props.userTimerLogs);
  const heatMapClassForValue = heatMapClassForValueGenerator(metadata);
  const humanizeMinutes = minutes => moment.duration(minutes, 'minutes').humanize();
  const titleForValue = value => {
    return value && `${value.date}\n${humanizeMinutes(value.count)}`;
  };
  return (
    <div>
      <div className='row'>
        <div className='col s12'>
          <CalendarHeatmap
            startDate={yearStart}
            endDate={today}
            values={metadata.data}
            classForValue={heatMapClassForValue}
            showWeekdayLabels={true}
            titleForValue={titleForValue}
          />
        </div>
      </div>
    </div>
  );
}

export function heatMapClassForValueGenerator(metadata) {
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
