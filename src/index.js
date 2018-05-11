
import createHistory from 'history/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';

import Authorize from './session/views/OAuthAuthorize';
import Home from './Home';
import PageNotFound from './PageNotFound';

import reducers from './reducers';

const history = createHistory();
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/authorize' component={Authorize} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('reactContainer')
);
