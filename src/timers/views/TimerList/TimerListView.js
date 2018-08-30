
import React from 'react';
import PropTypes from 'prop-types';
import IndeterminateLinear from '../../../Loading/IndeterminateLinear';

export default class TimerView extends React.Component {

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
        <li className='collection-item row'>
          <div className='col s1'>{userTimer.name}</div>
          <div className='col s11'>
            <div className='right-align'>
              <a key={userTimer.timerId}
                  href={`/edittimer?id=${userTimer.timerId}`}>
                  <i class="material-icons">edit</i>
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

TimerView.propTypes = {
  onMount: PropTypes.func
};

