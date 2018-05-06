import createHistory from 'history/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { Switch, Link } from 'react-router-dom';

// import reducers from './reducers' // Or wherever you keep your reducers

const history = createHistory();
const store = createStore((state, action) => {
  return state;
});

const Root = (props) => {
  return (
    <div>
      <nav>
        <Link to='/authorize' />
      </nav>
      <h1>Root</h1>
    </div>
  );
};

const Auth = (props) => <h1>Authorization page</h1>;
const FourOFour = props => <h1>404</h1>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Root} />
        <Route path='/authorize' component={Auth} />
        <Route component={FourOFour} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('reactContainer')
);
