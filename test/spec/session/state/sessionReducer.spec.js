
import reducer from '../../../../src/session/state/sessionReducer';
import * as actionCreators from '../../../../src/session/state/sessionActionCreators';
import { expect } from '../../../support/TestUtils';
import freeze from 'deep-freeze';

describe('sessionReducer unit test', () => {

  it('initial state', () => {
    const state = reducer(undefined, {});
    expect(state).to.eql({
      loading: true,
      data: undefined
    });
  });

  it('GET_SESSION_REQUEST', () => {
    const stateBefore = freeze({
      loading: false,
      data: undefined
    });
    const stateAfter = reducer(stateBefore, actionCreators.getSessionRequest());
    expect(stateAfter.loading).to.be.true;
  });

  it('GET_SESSION_RESPONSE', () => {
    const stateBefore = freeze({
      loading: true,
      data: undefined
    });
    const data = { authenticated: true };
    const stateAfter = reducer(stateBefore, actionCreators.getSessionResponse(data));
    expect(stateAfter.loading).to.be.false;
    expect(stateAfter.data.authenticated).to.be.true;
  });

});
