
import reducer from '../../../../src/session/state/sessionReducer';
import * as actionCreators from '../../../../src/session/state/sessionActionCreators';
import { expect } from '../../../support/TestUtils';
import freeze from 'deep-freeze';
import actions from '../../../../src/session/state/sessionActions';

describe('sessionReducer unit test', () => {

  it('initial state', () => {
    const state = reducer(undefined, {});
    expect(state).to.eql({
      isRecognized: false,
      isAuthenticated: false
    });
  });

  it('user is not recognized', () => {
    const stateBefore = freeze({ oldProperty: 'oldValue' });
    const stateAfter = reducer(stateBefore, { type: actions.UNRECOGNIZED_USER });
    expect(stateAfter).to.eql({
      isRecognized: false,
      isAuthenticated: false
    });
  });

  it('user is recognized but unauthenticated', () => {
    const stateBefore = freeze({ oldProperty: 'oldValue' });
    const stateAfter = reducer(stateBefore, { type: actions.UNAUTHENTICATED });
    expect(stateAfter).to.eql({
      isRecognized: true,
      isAuthenticated: false
    });
  });

  it('user is recognized and authenticated', () => {
    const stateBefore = freeze({
      isRecognized: false,
      isAuthenticated: false,
      oldProperty: 'oldValue'
    });
    const stateAfter = reducer(stateBefore, {
      type: actions.AUTHENTICATED,
      name: 'Corey',
      picture: 'https://domain.com/pic.png'
    });
    expect(stateAfter).to.eql({
      isRecognized: true,
      isAuthenticated: true,
      name: 'Corey',
      picture: 'https://domain.com/pic.png'
    });
  });

});
