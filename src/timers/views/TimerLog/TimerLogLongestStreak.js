
import './timerLogLongestStreak.scss';

export default function TimerLogLongestStreak(props) {

  const streaks = findLongestStreaks(props.userTimerLogs);

  return (
    <div className='timer-log-longest-streak'>
      <div className="row">

        {/* Current Streak */}
        <div className="col s12 m6">
          <div className="card-panel center-align">
            <span>
              <p className='title grey-text text-darken-2'>Current Streak</p>
              <p className='value'>{streaks.current.count} days</p>
              {
                streaks.current.count > 0 &&
                <p className='date-range grey-text text-darken-2'>
                  {streaks.current.start} to {streaks.current.end}
                </p>
              }
            </span>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="col s12 m6">
          <div className="card-panel center-align">
            <span>
              <p className='title grey-text text-darken-2'>Longest Streak</p>
              <p className='value'>{streaks.longest.count} days</p>
              {
                streaks.longest.count > 0 &&
                <p className='date-range grey-text text-darken-2'>
                  {streaks.longest.start} to {streaks.longest.end}
                </p>
              }
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

function findLongestStreaks(userTimerLogs) {
  const streaks = {
    longest: {
      count: 0
    },
    current: {
      count: 0
    }
  };
  if (!userTimerLogs || userTimerLogs.length === 0) return streaks;
  const set = new Set();
  userTimerLogs.forEach(log => {
    if (log.action === 'start') {
      set.add(moment(log.time).format('YYYY-MM-DD'));
    }
  });
  streaks.longest = findLongestStreak(set, userTimerLogs[0].time);
  streaks.current = findCurrentStreak(set);
  return streaks;
}

function findLongestStreak(setOfActiveDates, fromDate) {
  let start = moment(fromDate);
  let day = moment(fromDate);
  let counter = 0;
  const longest = {
    count: 1,
    start: start.format('YYYY-MM-DD'),
    end: start.format('YYYY-MM-DD')
  };
  const today = moment();
  while (day.isSameOrBefore(today)) {
    if (setOfActiveDates.has(day.format('YYYY-MM-DD'))) {
      counter++;
      if (counter > longest.count) {
        longest.count = counter;
        longest.start = start.format('YYYY-MM-DD');
        longest.end = day.format('YYYY-MM-DD');
      }
    } else {
      counter = 0;
      start = moment(day).add(1, 'day');
    }
    day.add(1, 'day');
  }
  return longest;
}

function findCurrentStreak(setOfActiveDates) {
  let day = moment();
  let count = 0;
  if (setOfActiveDates.has(day.format('YYYY-MM-DD'))) count++;
  day.add(-1, 'day');
  while (setOfActiveDates.has(day.format('YYYY-MM-DD'))) {
    count++;
    day.add(-1, 'day');
  }
  return {
    count,
    start: day.add(1, 'day').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  };
}
