
import React from 'react';
import Container from '../container/views/Container';
import TimerList from '../timers/views/TimerList';

export default function HomeView(props) {
  return (
    <Container>
      <div>
        {props.authenticated && <TimerList />}
        {!props.authenticated && <h1>Log in to see your timers</h1>}
      </div>
    </Container>
  );
}
