
import React from 'react';
import PropTypes from 'prop-types';

export default class OAuthCallbackView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  render() {
    return (
      <p>Establishing Session...</p>
    );
  }

}

OAuthCallbackView.propTypes = {
  onMount: PropTypes.func
};
