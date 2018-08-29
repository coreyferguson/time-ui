
import React from 'react';
import Container from '../container/views/Container';
import Timers from '../timers/views/Timers';

export default function HomeView(props) {
  return (
    <Container>
      <div>
        {props.authenticated && <Timers />}
      </div>
    </Container>
  );
}
