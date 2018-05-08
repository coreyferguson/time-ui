
import createHistory from 'history/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import Authorize from './session/views/OAuthAuthorize';
import Root from './Root';
import PageNotFound from './PageNotFound';

// import reducers from './reducers' // Or wherever you keep your reducers

const history = createHistory();
const store = createStore((state, action) => {
  return state;
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Root} />
        <Route path='/authorize' component={Authorize} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('reactContainer')
);
