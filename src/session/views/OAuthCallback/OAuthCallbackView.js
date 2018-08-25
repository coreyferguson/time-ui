
import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../../container/views/Container';

export default class OAuthCallbackView extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  render() {
    return (
      <Container>
        <p>Establishing Session...</p>
      </Container>
    );
  }

}

OAuthCallbackView.propTypes = {
  onMount: PropTypes.func
};
