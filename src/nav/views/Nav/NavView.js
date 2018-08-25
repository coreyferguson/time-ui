
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NavView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  loggedInView() {
    return this.props.authenticated && (
      <div>
        <li><a onClick={this.props.onLogOut}>Logout</a></li>
        <li><img
          style={{height: 40, marginTop: 10, marginRight: 10}}
          className='circle responsive-img'
          src={this.props.picture} />
        </li>
      </div>
    );
  }

  loggedOutView() {
    return !this.props.authenticated && (
      <li><a onClick={this.props.onLogIn}>Login</a></li>
    );
  }

  render() {
    console.log('render', this.props);
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
