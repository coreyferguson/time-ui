
import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div>
      <nav>
        <Link to='/authorize'>Authorize</Link>
      </nav>
      <h1>Root!!!</h1>
    </div>
  );
}
