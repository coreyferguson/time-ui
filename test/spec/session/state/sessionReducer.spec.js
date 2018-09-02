
import reducer from '../../../../src/session/state/sessionReducer';
import * as actionCreators from '../../../../src/session/state/sessionActionCreators';
import { expect } from '../../../support/TestUtils';
import freeze from 'deep-freeze';

xdescribe('sessionReducer unit test', () => {

  it('initial state', () => {
    const state = reducer(undefined, {});
    expect(state).to.eql({
      loading: true,
      authenticated: false,
      data: {}
    });
  });

  it('GET_SESSION_REQUEST', () => {
    const stateBefore = freeze({
      loading: false,
      data: {}
    });
    const stateAfter = reducer(stateBefore, actionCreators.getSessionRequest());
    expect(stateAfter.loading).to.be.true;
    expect(stateAfter.authenticated).to.be.false;
  });

  it('GET_SESSION_REQUEST already authenticated', () => {
    const stateBefore = freeze({
      loading: false,
      data: {
        user: { id: 'userIdValue' }
      }
    });
    const stateAfter = reducer(stateBefore, actionCreators.getSessionRequest());
    expect(stateAfter.loading).to.be.true;
    expect(stateAfter.authenticated).to.be.true;
  });

  it('GET_SESSION_RESPONSE successfully authenticated', () => {
    const stateBefore = freeze({
      loading: true,
      data: {
        user: { id: 'userIdValue' }
      }
    });
    const data = {
      user: { id: 'userIdValue' }
    };
    const stateAfter = reducer(stateBefore, actionCreators.getSessionResponse(data));
    expect(stateAfter.loading).to.be.false;
    expect(stateAfter.authenticated).to.be.true;
  });

  it('GET_SESSION_RESPONSE not authenticated', () => {
    const stateBefore = freeze({
      loading: true
    });
    const data = {};
    const stateAfter = reducer(stateBefore, actionCreators.getSessionResponse(data));
    expect(stateAfter.loading).to.be.false;
    expect(stateAfter.authenticated).to.be.false;
  });

});
