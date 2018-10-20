
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
        'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
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
        'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
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
        'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
      },
      data
    }).then(response => {
      dispatch(saveTimerResponse(data));
      window.location.href = `/timerLog?id=${data.timerId}`;
    }).catch(err => {
      dispatch(saveTimerError());
    });

  };
}

function getUserTimerLogRequest() {
  return { type: actions.GET_TIMER_LOGS_REQUEST };
}

function getUserTimerLogResponse(userTimerLogs) {
  return { type: actions.GET_TIMER_LOGS_RESPONSE, userTimerLogs };
}

function getUserTimerLogError() {
  return { type: actions.GET_TIMER_LOGS_ERROR };
}

export function getUserTimerLog(timerId) {
  return dispatch => {
    dispatch(getUserTimerLogRequest());
    axios({
      url: `https://time-api.overattribution.com/timers/${timerId}/logs`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
      }
    }).then(response => {
      dispatch(getUserTimerLogResponse(response.data.userTimerLogs));
    }).catch(err => {
      dispatch(getUserTimerLogError());
    });
  };
}

function startTimerRequest() {
  return { type: actions.START_TIMER_REQUEST };
}

function startTimerResponse() {
  return { type: actions.START_TIMER_RESPONSE };
}

function startTimerError() {
  return { type: actions.START_TIMER_ERROR };
}

export function startTimer(timerId) {
  return dispatch => {
    dispatch(startTimerRequest());
    axios({
      url: `https://time-api.overattribution.com/timers/${timerId}/start`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
      }
    }).then(() => {
      dispatch(startTimerResponse());
      dispatch(getUserTimerLog(timerId));
    }).catch(err => {
      dispatch(startTimerError());
    });
  };
}

function stopTimerRequest() {
  return { type: actions.STOP_TIMER_REQUEST };
}

function stopTimerResponse() {
  return { type: actions.STOP_TIMER_RESPONSE };
}

function stopTimerError() {
  return { type: actions.STOP_TIMER_ERROR };
}

export function stopTimer(timerId) {
  return dispatch => {
    dispatch(stopTimerRequest());
    axios({
      url: `https://time-api.overattribution.com/timers/${timerId}/stop`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
      }
    }).then(() => {
      dispatch(stopTimerResponse());
      dispatch(getUserTimerLog(timerId));
    }).catch(err => {
      dispatch(stopTimerError());
    });
  };
}

function deleteLogRequest(time) {
  return { type: actions.DELETE_TIMER_LOG_REQUEST, time };
}

function deleteLogResponse() {
  return { type: actions.DELETE_TIMER_LOG_RESPONSE };
}

function deleteLogError() {
  return { type: actions.DELETE_TIMER_LOG_ERROR };
}

function deleteLogXhr(timerId, time) {
  return axios({
    url: `https://time-api.overattribution.com/timers/${timerId}/logs`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
    },
    data: { time }
  });
}

export function deleteLog(timerId, time) {
  return dispatch => {
    dispatch(deleteLogRequest(time));
    deleteLogXhr(timerId, time).then(() => {
      dispatch(deleteLogResponse());
    }).catch(err => {
      dispatch(deleteLogError());
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  };
}

function saveLogRequest(time, action) {
  return { type: actions.SAVE_TIMER_LOG_REQUEST, time, action };
}

function saveLogResponse() {
  return { type: actions.SAVE_TIMER_LOG_RESPONSE };
}

function saveLogError() {
  return { type: actions.SAVE_TIMER_LOG_ERROR };
}

function saveLogXhr(timerId, time, action) {
  return axios({
    url: `https://time-api.overattribution.com/timers/${timerId}/logs`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('oauth_access_token')}`
    },
    data: { time, action }
  });
}

export function saveLog(timerId, time, action) {
  return dispatch => {
    dispatch(saveLogRequest(time, action));
    saveLogXhr(timerId, time, action).then(() => {
      dispatch(saveLogResponse());
    }).catch(err => {
      dispatch(saveLogError());
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  };
}

function editLogRequest(log, newTime) {
  return { type: actions.EDIT_TIMER_LOG_REQUEST, log, newTime };
}

function editLogResponse() {
  return { type: actions.EDIT_TIMER_LOG_RESPONSE };
}

function editLogError() {
  return { type: actions.EDIT_TIMER_LOG_ERROR };
}

export function editLog(log, newTime) {
  newTime = new Date(newTime).toISOString();
  return dispatch => {
    dispatch(editLogRequest(log, newTime));
    saveLogXhr(log.timerId, newTime, log.action).then(() => {
      return deleteLogXhr(log.timerId, log.time);
    }).then(() => {
      dispatch(editLogResponse());
    }).catch(err => {
      dispatch(editLogError());
    });
  };
}
