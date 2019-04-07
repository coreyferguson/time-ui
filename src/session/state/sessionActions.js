
import { Enum } from 'enumify';

export default class SessionActions extends Enum {}
SessionActions.initEnum([

  // Cannot determine if this user has logged on in the past
  'UNRECOGNIZED_USER',

  // User has logged on in the past, but session is now expired
  'UNAUTHENTICATED',

  // User has an active session
  'AUTHENTICATED'

]);
