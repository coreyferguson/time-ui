
const { expect } = require('../support/TestUtils');

describe('test environment', () => {

  it('`describe` and `it` working correctly', () => {
    // if we made this this far... success!
  });

  it('`expect` works as expected', () => {
    expect(true).to.be.true;
    expect(false).to.be.false;
    expect(true).to.not.be.false;
  });

});
