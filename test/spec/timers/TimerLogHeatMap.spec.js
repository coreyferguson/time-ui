
const { heatMapClassForValueGenerator } = require('../../../src/timers/views/TimerLog/TimerLogHeatMap');
const { expect } = require('../../support/TestUtils');

describe('TimerLogHeatMap', () => {

  describe('heatMapClassForValueGenerator', () => {

    it('null userTimerLogs', () => {
      const metadata = { userTimerLogs: undefined };
      const fn = heatMapClassForValueGenerator(metadata);
      expect(fn()).to.equal('color-0');
      expect(fn({ count: 10 })).to.equal('color-0');
    });

    it('low-high: 10-60', () => {
      const metadata = { userTimerLogs: 'not-null', low: 10, high: 60 };
      const fn = heatMapClassForValueGenerator(metadata);
      expect(fn()).to.equal('color-0');
      expect(fn({ count: 10 })).to.equal('color-1');
      expect(fn({ count: 22 })).to.equal('color-1');
      expect(fn({ count: 23 })).to.equal('color-2');
      expect(fn({ count: 34 })).to.equal('color-2');
      expect(fn({ count: 35 })).to.equal('color-3');
      expect(fn({ count: 47 })).to.equal('color-3');
      expect(fn({ count: 48 })).to.equal('color-4');
      expect(fn({ count: 60 })).to.equal('color-4');
    });

  });

});
