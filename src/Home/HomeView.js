
import React from 'react';
import Container from '../container/views/Container';
import TimerList from '../timers/views/TimerList';
import ExampleStartStopTimer from './img/ExampleStartStopTimer.png';
import ExampleTimeChartYear from './img/ExampleTimeChartYear.png';
import ExampleLongestStreak from './img/ExampleLongestStreak.png';
import ExampleVoiceCommand from './img/ExampleVoiceCommand.png';
import ExampleGraphQL from './img/ExampleGraphQL.png';

export default function HomeView(props) {
  return (
    <Container>
      <div>
        {props.isAuthenticated && <TimerList />}
        {!props.isAuthenticated && <div>
          <h1>Time</h1>

          <h5>Simple timer application with powerful features.</h5>
          <h6>See what we can do below. Log in (top right) to do it yourself.</h6>

          <br />
          <hr />
          <br />
          <br />

          <div className='row'>
            <div className='col s6'>
              <div className="card">
                <div className='card-content'>
                  <span className="card-title">Start and stop named timers</span>
                </div>
                <div className="card-image">
                  <img src={ExampleStartStopTimer} />
                </div>
              </div>
            </div>
            <div className='col s6'>
              <div className="card">
                <div className='card-content'>
                  <span className="card-title">Set records</span>
                </div>
                <div className="card-image">
                  <img src={ExampleLongestStreak} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <div className="card">
                <div className="card-content">
                  <span className="card-title">View your logs with beautiful visualizations</span>
                </div>
                <div className="card-image">
                  <img src={ExampleTimeChartYear} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Integrate with <a href="https://ifttt.com/">IFTTT</a></span>
                  <p>Start and stop timers on voice command.</p>
                  <p>Start and stop timers when arriving at work.</p>
                </div>
                <div className="card-image">
                  <img src={ExampleVoiceCommand} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Own your data</span>
                  <p>Are you a developer? Pull your own data using GraphQL APIs.</p>
                </div>
                <div className="card-image">
                  <img src={ExampleGraphQL} />
                </div>
              </div>
            </div>
          </div>

        </div>}
      </div>
    </Container>
  );
}
