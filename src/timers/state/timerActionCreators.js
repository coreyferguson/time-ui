
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

function getUserTimerRequest() {
  return { type: actions.GET_TIMER_REQUEST };
}

function getUserTimerResponse(userTimer) {
  return {
    type: actions.GET_TIMER_RESPONSE,
    userTimer
  };
}

function getUserTimerError() {
  return { type: actions.GET_TIMER_ERROR };
}

export function getUserTimer(timerId) {
  return dispatch => {
    dispatch(getUserTimerRequest());
    axios({
      method: 'GET',
      url: 'https://time-api.overattribution.com/timers',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => {
      const filtered = response.data.userTimers
        .filter(userTimer => userTimer.timerId === timerId);
      if (filtered.length !== 1) dispatch(getUserTimerError());
      else dispatch(getUserTimerResponse(filtered[0]));
    }).catch(err => {
      dispatch(getUserTimerError());
    });
  };
}

function saveTimerRequest() {
  return { type: actions.SAVE_TIMER_REQUEST };
}

function saveTimerResponse(userTimer) {
  return { type: actions.SAVE_TIMER_RESPONSE, userTimer };
}

function saveTimerError() {
  return { type: actions.SAVE_TIMER_ERROR };
}

export function saveTimer(data) {
  return dispatch => {
    dispatch(saveTimerRequest());
    axios({
      method: 'POST',
      url: 'https://time-api.overattribution.com/timers',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      data
    }).then(response => {
      dispatch(saveTimerResponse(data));
    }).catch(err => {
      dispatch(saveTimerError());
    });

  };
}
