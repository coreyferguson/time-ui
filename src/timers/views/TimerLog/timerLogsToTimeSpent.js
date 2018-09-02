
import moment from 'moment';

export default function timerLogsToTimeSpent(userTimerLogs) {
  const metadata = {
    map: new Map(),
    data: [],
    userTimerLogs
  };
  if (!userTimerLogs || userTimerLogs.length === 0) return metadata;
  // generate map
  const m = new Map();
  let start, stop;
  userTimerLogs.forEach(log => {
    if (!start && log.action === 'start') {
      start = moment(log.time);
    } else if (start && log.action === 'stop') {
      stop = moment(log.time);
      let diff = Math.ceil(moment.duration(stop.diff(start)).as('minutes'));
      const label = moment(log.time).format('YYYY-MM-DD');
      m.set(label, m.get(label)+diff || diff);
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
  metadata.low = data.length > 0 ? heatMapLow : undefined;
  metadata.high = data.length > 0 ? heatMapHigh : undefined;
  return metadata;
}
