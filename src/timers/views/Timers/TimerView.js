
import React from 'react';
import PropTypes from 'prop-types';

export default class TimerView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  render() {
    return (
      <div>
        <h1>Timers</h1>
        {this.props.loading && <p>Loading...</p>}
      </div>
    );
  }

}

TimerView.propTypes = {
  onMount: PropTypes.func
};

