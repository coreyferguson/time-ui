
import timerLogsToTimeSpent from '../../../src/timers/views/TimerLog/timerLogsToTimeSpent';
import { expect } from '../../support/TestUtils';
import moment from 'moment';
import momentTz from 'moment-timezone';

describe('timerLogsToTimeSpent', () => {

  before(() => {
    moment.tz.setDefault('America/Los_Angeles');
  });

  it('undefined userTimerLogs', () => {
    const metadata = timerLogsToTimeSpent();
    expect(metadata).to.not.be.null;
    expect(metadata.map).to.not.be.null;
    expect(metadata.map.size).to.be.equal(0);
    expect(metadata.data).to.not.be.null;
    expect(metadata.data.length).to.be.equal(0);
    expect(metadata.userTimerLogs).to.be.undefined;
    expect(metadata.high).to.be.undefined;
    expect(metadata.low).to.be.undefined;
  });

  it('empty userTimerLogs', () => {
    const metadata = timerLogsToTimeSpent([]);
    expect(metadata).to.not.be.null;
    expect(metadata.map).to.not.be.null;
    expect(metadata.map.size).to.be.equal(0);
    expect(metadata.data).to.not.be.null;
    expect(metadata.data.length).to.be.equal(0);
    expect(metadata.userTimerLogs).to.not.be.null;
    expect(metadata.userTimerLogs.length).to.equal(0);
    expect(metadata.high).to.be.undefined;
    expect(metadata.low).to.be.undefined;
  });

  it('single `start` log', () => {
    const userTimerLogs = [{ action: 'start', time: '2018-01-01T00:00:00.000Z' }];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map).to.not.be.null;
    expect(metadata.map.size).to.be.equal(0);
    expect(metadata.data).to.be.eql([]);
    expect(metadata.userTimerLogs).to.be.equal(userTimerLogs);
    expect(metadata.low).to.be.undefined;
    expect(metadata.high).to.be.undefined;
  });

  it('single `stop` log', () => {
    const userTimerLogs = [{ action: 'stop', time: '2018-01-01T00:00:00.000Z' }];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map).to.not.be.null;
    expect(metadata.map.size).to.be.equal(0);
    expect(metadata.data).to.be.eql([]);
    expect(metadata.userTimerLogs).to.be.equal(userTimerLogs);
    expect(metadata.low).to.be.undefined;
    expect(metadata.high).to.be.undefined;
  });

  it('single `stop` before `start` action', () => {
    const userTimerLogs = [
      { action: 'stop',  time: '2018-01-01T00:00:00.000Z' },
      { action: 'start', time: '2018-01-01T00:01:00.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map).to.not.be.null;
    expect(metadata.map.size).to.be.equal(0);
    expect(metadata.data).to.be.eql([]);
    expect(metadata.userTimerLogs).to.be.equal(userTimerLogs);
    expect(metadata.low).to.be.undefined;
    expect(metadata.high).to.be.undefined;
  });

  it('single `start` and `stop` log', () => {
    const userTimerLogs = [
      { action: 'start', time: '2018-01-01T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:01:00.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map.size, 'map.size').to.equal(1);
    expect(metadata.map.get('2017-12-31'), 'map[2017-12-31]').to.equal(1);
    expect(metadata.data.length, 'data.length').to.equal(1);
    expect(metadata.data[0], 'data[0]').to.eql({
      'date': '2017-12-31',
      'count': 1
    });
    expect(metadata.userTimerLogs, 'userTimerLogs').to.equal(userTimerLogs);
    expect(metadata.low, 'low').to.equal(1);
    expect(metadata.high, 'high').to.equal(1);
  });

  it('single `start` and `stop` on multiple days', () => {
    const userTimerLogs = [
      { action: 'start', time: '2018-01-01T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:01:00.000Z' },
      { action: 'start', time: '2018-01-02T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-02T00:02:00.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map.size, 'map.size').to.equal(2);
    expect(metadata.map.get('2017-12-31'), 'map[2017-12-31]').to.equal(1);
    expect(metadata.map.get('2018-01-01'), 'map[2018-01-01]').to.equal(2);
    expect(metadata.data.length, 'data.length').to.equal(2);
    expect(metadata.data[0], 'data[0]').to.eql({
      'date': '2017-12-31',
      'count': 1
    });
    expect(metadata.data[1], 'data[1]').to.eql({
      'date': '2018-01-01',
      'count': 2
    });
    expect(metadata.userTimerLogs, 'userTimerLogs').to.equal(userTimerLogs);
    expect(metadata.low, 'low').to.equal(1);
    expect(metadata.high, 'high').to.equal(2);
  });

  it('multiple `start` and `stop` on same day', () => {
    const userTimerLogs = [
      { action: 'start', time: '2018-01-01T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:01:00.000Z' },
      { action: 'start', time: '2018-01-01T00:05:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:06:00.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map.size, 'map.size').to.equal(1);
    expect(metadata.map.get('2017-12-31'), 'map[2017-12-31]').to.equal(2);
    expect(metadata.data.length, 'data.length').to.equal(1);
    expect(metadata.data[0], 'data[0]').to.eql({
      'date': '2017-12-31',
      'count': 2
    });
    expect(metadata.userTimerLogs, 'userTimerLogs').to.equal(userTimerLogs);
    expect(metadata.low, 'low').to.equal(2);
    expect(metadata.high, 'high').to.equal(2);
  });

  it('multiple `start` and `stop` on multiple days', () => {
    const userTimerLogs = [
      { action: 'start', time: '2018-01-01T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:01:00.000Z' },
      { action: 'start', time: '2018-01-01T00:05:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:06:00.000Z' },
      { action: 'start', time: '2018-01-02T00:05:00.000Z' },
      { action: 'stop',  time: '2018-01-02T00:10:00.000Z' },
      { action: 'start', time: '2018-01-02T00:15:00.000Z' },
      { action: 'stop',  time: '2018-01-02T00:25:00.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map.size, 'map.size').to.equal(2);
    expect(metadata.map.get('2017-12-31'), 'map[2017-12-31]').to.equal(2);
    expect(metadata.map.get('2018-01-01'), 'map[2018-01-01]').to.equal(15);
    expect(metadata.data.length, 'data.length').to.equal(2);
    expect(metadata.data[0], 'data[0]').to.eql({
      'date': '2017-12-31',
      'count': 2
    });
    expect(metadata.data.length, 'data.length').to.equal(2);
    expect(metadata.data[1], 'data[1]').to.eql({
      'date': '2018-01-01',
      'count': 15
    });
    expect(metadata.userTimerLogs, 'userTimerLogs').to.equal(userTimerLogs);
    expect(metadata.low, 'low').to.equal(2);
    expect(metadata.high, 'high').to.equal(15);
  });

  it('`start` and `stop` crossing midnight in local timezone', () => {
    const userTimerLogs = [
      { action: 'start', time: '2018-01-01T07:30:00.000Z' },
      { action: 'stop',  time: '2018-01-01T08:30:00.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map.size, 'map.size').to.equal(1);
    expect(metadata.map.get('2018-01-01'), 'map[2018-01-01]').to.equal(60);
    expect(metadata.data.length, 'data.length').to.equal(1);
    expect(metadata.data[0], 'data[0]').to.eql({
      'date': '2018-01-01',
      'count': 60
    });
    expect(metadata.userTimerLogs, 'userTimerLogs').to.equal(userTimerLogs);
    expect(metadata.low, 'low').to.equal(60);
    expect(metadata.high, 'high').to.equal(60);
  });

  it('time rounded up to nearest minute', () => {
    const userTimerLogs = [
      { action: 'start', time: '2018-01-01T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-01T00:01:15.000Z' },
      { action: 'start', time: '2018-01-02T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-02T00:00:30.000Z' },
      { action: 'start', time: '2018-01-03T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-03T00:03:45.000Z' },
      { action: 'start', time: '2018-01-04T00:00:00.000Z' },
      { action: 'stop',  time: '2018-01-04T00:02:15.000Z' }
    ];
    const metadata = timerLogsToTimeSpent(userTimerLogs);
    expect(metadata.map.size, 'map.size').to.equal(4);
    expect(metadata.map.get('2017-12-31'), 'map[2017-12-31]').to.equal(2);
    expect(metadata.map.get('2018-01-01'), 'map[2018-01-01]').to.equal(1);
    expect(metadata.map.get('2018-01-02'), 'map[2018-01-02]').to.equal(4);
    expect(metadata.map.get('2018-01-03'), 'map[2018-01-03]').to.equal(3);
    expect(metadata.data.length, 'data.length').to.equal(4);
    expect(metadata.data[0], 'data[0]').to.eql({ 'date': '2017-12-31', 'count': 2 });
    expect(metadata.data[1], 'data[1]').to.eql({ 'date': '2018-01-01', 'count': 1 });
    expect(metadata.data[2], 'data[2]').to.eql({ 'date': '2018-01-02', 'count': 4 });
    expect(metadata.data[3], 'data[3]').to.eql({ 'date': '2018-01-03', 'count': 3 });
    expect(metadata.userTimerLogs, 'userTimerLogs').to.equal(userTimerLogs);
    expect(metadata.low, 'low').to.equal(1);
    expect(metadata.high, 'high').to.equal(4);
  });

});
