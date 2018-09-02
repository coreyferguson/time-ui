
import './timerLogTotalHours.scss';
import timerLogsToTimeSpent from './timerLogsToTimeSpent';

export default function TimerLogTotalHours(props) {
  let minutesForWeek  = 0;
  let minutesForMonth = 0;
  let minutesForYear  = 0;
  let weekThreshold = moment().add(-1, 'week');
  let monthThreshold = moment().add(-1, 'month');
  let yearThreshold = moment().add(-1, 'year');
  const metadata = timerLogsToTimeSpent(props.userTimerLogs);
  for (let i=metadata.data.length-1; i>=0; i--) {
    const date = moment(metadata.data[i].date);
    if (date.isAfter(weekThreshold)) {
      minutesForWeek += metadata.data[i].count;
    }
    if (date.isAfter(monthThreshold)) {
      minutesForMonth += metadata.data[i].count;
    }
    if (date.isAfter(yearThreshold)) {
      minutesForYear += metadata.data[i].count;
    }
  }
  const format = d => `${Math.floor(d.as('hours'))}h ${d.get('minutes')}m`;
  const durationThisWeek = moment.duration(minutesForWeek, 'minutes');
  const durationThisMonth = moment.duration(minutesForMonth, 'minutes');
  const durationThisYear = moment.duration(minutesForYear, 'minutes');
  const timeThisWeek = format(durationThisWeek);
  const timeThisMonth = format(durationThisMonth);
  const timeThisYear = format(durationThisYear);
  return (
    <div className='timer-log-total-hours'>
      <div className='row'>

        {/* Total Hours This Week */}
        <div className='col s6 m4'>
          <div className="card-panel center-align">
            <p className='title grey-text text-darken-2'>Total Time This Week</p>
            <p className='value'>{timeThisWeek}</p>
          </div>
        </div>

        {/* Total Hours This Month */}
        <div className='col s6 m4'>
          <div className="card-panel center-align">
            <p className='title grey-text text-darken-2'>Total Time This Month</p>
            <p className='value'>{timeThisMonth}</p>
          </div>
        </div>

        {/* Total Hours This Year */}
        <div className='col s12 m4'>
          <div className="card-panel center-align">
            <p className='title grey-text text-darken-2'>Total Time This Year</p>
            <p className='value'>{timeThisYear}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
