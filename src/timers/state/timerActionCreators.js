
import axios from 'axios';
import actions from './timerActions';

function getUserTimersRequest() {
  return { type: actions.GET_TIMERS_REQUEST };
}

function getUserTimersResponse(userTimers) {
  return {
    type: actions.GET_TIMERS_RESPONSE,
    userTimers
  };
}

function getUserTimersError() {
  return { type: actions.GET_TIMERS_ERROR };
}

export function getUserTimers() {
  return dispatch => {
    dispatch(getUserTimersRequest());
    axios({
      method: 'GET',
      url: 'https://time-api.overattribution.com/timers',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => {
      dispatch(getUserTimersResponse(response.data.userTimers));
    }).catch(err => {
      dispatch(getUserTimersError());
    });
  };
}
