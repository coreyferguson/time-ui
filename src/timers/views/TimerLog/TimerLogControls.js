
import React from 'react';
import PropTypes from 'prop-types';

export default class TimerLogController extends React.Component {

  constructor(props) {
    super(props);
  }

}

TimerLogController.propTypes = {
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired
}
