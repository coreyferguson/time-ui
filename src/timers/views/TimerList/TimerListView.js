
import React from 'react';
import PropTypes from 'prop-types';
import IndeterminateLinear from '../../../Loading/IndeterminateLinear';
import './TimerList.scss';

export default class TimerListView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  renderLoading() {
    return this.props.loading && <IndeterminateLinear />;
  }

  renderUserTimers() {
    if (!this.props.userTimers) return;
    const items = this.props.userTimers.map(userTimer =>
      <a key={userTimer.timerId} className='collection-item' href={`/timerLog?id=${userTimer.timerId}`}>
        {userTimer.name}
      </a>
    );
    return (
      <div className='collection'>
        {items}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className='row'>
        <div className='col s6'>
          <h4>Timers</h4>
        </div>
        <div className='col s6' style={{marginTop: '1em'}}>
          <div className='right-align'>
            <a
                href='/addtimer'
                className="btn-floating btn-large waves-effect waves-light red">
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='timer-list'>
        {this.renderHeader()}
        {this.renderLoading()}
        {this.renderUserTimers()}
      </div>
    );
  }

}

TimerListView.propTypes = {
  onMount: PropTypes.func
};

