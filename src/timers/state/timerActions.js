
import { Enum } from 'enumify';

export default class TimerActions extends Enum {}
TimerActions.initEnum([
  'GET_TIMERS_REQUEST',
  'GET_TIMERS_RESPONSE',
  'GET_TIMERS_ERROR'
]);
