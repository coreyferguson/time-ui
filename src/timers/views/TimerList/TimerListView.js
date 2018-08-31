
import React from 'react';
import PropTypes from 'prop-types';
import IndeterminateLinear from '../../../Loading/IndeterminateLinear';

export default class TimerListView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  renderLoading() {
    return this.props.loading && <IndeterminateLinear />;
  }

  renderUserTimers() {
    if (!this.props.userTimers) return;
    const items = this.props.userTimers.map(userTimer => {
      return (
        <li key={userTimer.timerId} className='collection-item row'>
          <div className='col s1'>
            <a href={`/timerLog?id=${userTimer.timerId}`}>
              {userTimer.name}
            </a>
          </div>
          <div className='col s11'>
            <div className='right-align'>
              <a href={`/timerLog?id=${userTimer.timerId}`}>
                  <i className="material-icons">history</i>
              </a>
              <a href={`/edittimer?id=${userTimer.timerId}`}>
                  <i className="material-icons">edit</i>
              </a>
            </div>
          </div>
        </li>
      );
    });
    return (
      <ul className='collection'>
        {items}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h1>Timers</h1>
        {this.renderLoading()}
        {this.renderUserTimers()}
      </div>
    );
  }

}

TimerListView.propTypes = {
  onMount: PropTypes.func
};

