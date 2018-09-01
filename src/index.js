
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';

import Home from './Home';
import PageNotFound from './PageNotFound';
import OAuthCallback from './session/views/OAuthCallback';
import TimerAdd from './timers/views/TimerAdd';
import TimerEdit from './timers/views/TimerEdit';
import TimerLog from './timers/views/TimerLog';

import reducers from './reducers';

import './styles.scss';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware)
);

// Initialize UI
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/oauth_callback' component={OAuthCallback} />
        <Route path='/addtimer' component={TimerAdd} />
        <Route path='/edittimer' component={TimerEdit} />
        <Route path='/timerlog' component={TimerLog} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('reactContainer')
);
