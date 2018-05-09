
import React from 'react';
import Nav from '../../../nav/views/Nav';
import PropTypes from 'prop-types';

export default function ContainerView(props) {
  return (
    <div>
      <Nav />
      <div className='container'>
        {props.children}
      </div>
    </div>
  );
}

ContainerView.propTypes = {
  children: PropTypes.element.isRequired
};
