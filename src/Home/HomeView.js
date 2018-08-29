
import React from 'react';
import Container from '../container/views/Container';
import Timers from '../timers/views/Timers';

export default function HomeView(props) {
  return (
    <Container>
      <div>
        {props.authenticated && <Timers />}
        {!props.authenticated && <h1>Log in to see your timers</h1>}
      </div>
    </Container>
  );
}
