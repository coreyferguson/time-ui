
import React from 'react';
import './errorStyles.scss';

export default function UnknownServerError(props) {
  return (
    <div className='error-container'>
      <div className='card-panel red lighten-3 valign-wrapper'>
        <i className='material-icons medium'>error</i>
        <p>Unknown error from server. Please try again.</p>
      </div>
    </div>
  );
}
