
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NavView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Time</a>
        </div>
      </nav>
    );
  }

}

NavView.propTypes = {
  onMount: PropTypes.function
};
