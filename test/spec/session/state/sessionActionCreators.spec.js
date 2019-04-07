
import * as actionCreators from '../../../../src/session/state/sessionActionCreators';
import { expect, sinon } from '../../../support/TestUtils';
import actions from '../../../../src/session/state/sessionActions';
import moment from 'moment';

describe('sessionActionCreators unit test', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('getSession - unrecognized user', () => {
    sandbox.stub(localStorage, 'getItem').withArgs('is_recognized_user').returns(undefined);
    const fn = actionCreators.getSession();
    const dispatch = sinon.spy();
    fn(dispatch);
    const call = dispatch.getCall(0);
    expect(call).to.not.be.undefined;
    expect(call.args).to.not.be.undefined;
    expect(call.args.length).to.be.equal(1);
    expect(call.args[0]).to.eql({
      type: actions.UNRECOGNIZED_USER
    });
  });

  it('getSession - unauthenticated user', () => {
    sandbox.stub(localStorage, 'getItem')
      .withArgs('is_recognized_user')
        .returns(true)
      .withArgs('oauth_expires_at')
        .returns(moment().add(-1, 'minute').toDate().getTime());
    const fn = actionCreators.getSession();
    const dispatch = sinon.spy();
    fn(dispatch);
    const call = dispatch.getCall(0);
    expect(call).to.not.be.null;
    expect(call.args).to.not.be.undefined;
    expect(call.args.length).to.be.equal(1);
    expect(call.args[0]).to.eql({
      type: actions.UNAUTHENTICATED
    });
  });

  it('getSession - authenticated user', () => {
    sandbox.stub(localStorage, 'getItem')
      .withArgs('is_recognized_user')
        .returns(true)
      .withArgs('oauth_expires_at')
        .returns(moment().add(10, 'minutes').toDate().getTime())
      .withArgs('oauth_user_name')
        .returns('Corey')
      .withArgs('oauth_user_picture')
        .returns('https://domain.com/picture.png');
    const fn = actionCreators.getSession();
    const dispatch = sinon.spy();
    fn(dispatch);
    const call = dispatch.getCall(0);
    expect(call).to.not.be.null;
    expect(call.args).to.not.be.undefined;
    expect(call.args.length).to.be.equal(1);
    expect(call.args[0]).to.eql({
      type: actions.AUTHENTICATED,
      name: 'Corey',
      picture: 'https://domain.com/picture.png'
    });
  });

  it('_parseHash with valid authResult', () => {
    sandbox.stub(localStorage, 'setItem');
    const dispatch = sinon.spy();
    actionCreators._parseHash(
      undefined,
      {
        accessToken: 'accessTokenValue',
        idToken: 'idTokenValue',
        expiresIn: 60, // 60 seconds from now
        idTokenPayload: {
          given_name: 'Corey',
          picture: 'https://domain.com/picture.png'
        }
      },
      dispatch);
    const storage = {};
    for (let call of localStorage.setItem.getCalls()) {
      storage[call.args[0]] = call.args[1];
    }
    expect(storage).to.have.property('is_recognized_user', true);
    expect(storage).to.have.property('oauth_access_token', 'accessTokenValue');
    expect(storage).to.have.property('oauth_expires_at');
    expect(storage).to.have.property('oauth_id_token', 'idTokenValue');
    expect(storage).to.have.property('oauth_user_name', 'Corey');
    expect(storage).to.have.property('oauth_user_picture', 'https://domain.com/picture.png');
    expect(dispatch).to.be.calledOnce;
  });

  it('_parseHash with no authResult', () => {
    sandbox.stub(localStorage, 'setItem');
    const dispatch = sinon.spy();
    actionCreators._parseHash(undefined, undefined, dispatch);
    expect(localStorage.setItem).to.not.be.called;
    expect(dispatch).to.be.calledOnce;
  });

});
