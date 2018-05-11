
import actions from './sessionActions';
import service from '../service/sessionService';

export function getSessionRequest() {
  return {
    type: actions.GET_SESSION_REQUEST
  };
}

export function getSessionResponse(session) {
  return {
    type: actions.GET_SESSION_RESPONSE,
    session
  }
}

export function getSession() {
  return dispatch => {
    dispatch(getSessionRequest());
    return service.findMe().then(response => {
      dispatch(getSessionResponse(response.data));
    });
  };
}
