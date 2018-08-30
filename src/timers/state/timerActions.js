
import { Enum } from 'enumify';

export default class TimerActions extends Enum {}
TimerActions.initEnum([
  'GET_TIMERS_REQUEST',
  'GET_TIMERS_RESPONSE',
  'GET_TIMERS_ERROR',
  'GET_TIMER_REQUEST',
  'GET_TIMER_RESPONSE',
  'GET_TIMER_ERROR',
  'SAVE_TIMER_REQUEST',
  'SAVE_TIMER_RESPONSE',
  'SAVE_TIMER_ERROR'
]);
