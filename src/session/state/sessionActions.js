
import { Enum } from 'enumify';

export default class SessionActions extends Enum {}
SessionActions.initEnum([
  'GET_SESSION',
  'ESTABLISH_SESSION',
  'LOG_OUT',
  'LOG_IN'
]);
