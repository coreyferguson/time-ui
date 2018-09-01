
import './timerLogLongestStreak.scss';

export default function TimerLogLongestStreak(props) {

  const streaks = findLongestStreaks(props.userTimerLogs);

  return (
    <div className='timer-log-longest-streak'>
      <div className="row">

        {/* Longest Streak */}
        <div className="col s6">
          <div className="card-panel center-align">
            <span>
              <p className='title grey-text'>Longest Streak</p>
              <p className='value'>{streaks.longest} days</p>
            </span>
          </div>
        </div>

        {/* Current Streak */}
        <div className="col s6">
          <div className="card-panel center-align">
            <span>
              <p className='title grey-text'>Current Streak</p>
              <p className='value'>{streaks.current} days</p>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

function findLongestStreaks(userTimerLogs) {
  const streaks = {
    longest: 0,
    current: 0
  };
  if (!userTimerLogs) return streaks;
  const set = new Set();
  userTimerLogs.forEach(log => set.add(moment(log.time).format('YYYY-MM-DD')));
  // find longest streak
  let longest = 0;
  let day = moment(userTimerLogs[0].time);
  let today = moment();
  let counter = 0;
  while (day.isSameOrBefore(today)) {
    if (set.has(day.format('YYYY-MM-DD'))) {
      counter++;
    } else {
      longest = Math.max(longest, counter);
      counter = 0;
    }
    day.add(1, 'day');
  }
  streaks.longest = longest;
  // find current streak
  day = today;
  counter = 0;
  while (set.has(day.format('YYYY-MM-DD'))) {
    day.add(-1, 'day');
    counter++;
  }
  streaks.current = counter;
  return streaks;
}
