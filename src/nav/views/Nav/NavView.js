
import React from 'react';
import PropTypes from 'prop-types';
import './NavView.scss';

export default class NavView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  loggedInView() {
    return this.props.authenticated && (
      <div className='session-container'>
        <li><a onClick={this.props.onLogOut}>Logout</a></li>
        <li><img
          className='picture circle responsive-img'
          src={this.props.picture} />
        </li>
      </div>
    );
  }

  loggedOutView() {
    return !this.props.authenticated && (
      <div className='session-container'>
        <li><a onClick={this.props.onLogIn}>Login</a></li>
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <a href='/' className='brand-logo'>Time</a>
          <ul className='right'>
            {this.loggedInView()}
            {this.loggedOutView()}
          </ul>
        </div>
      </nav>
    );
  }

}

NavView.propTypes = {
  onMount: PropTypes.func
};
