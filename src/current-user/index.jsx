import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import '../style.css';
import CheckList from './CheckList';
import SignIn from './SignIn';
import ChangePassword from './ChangePassword';
import Info from './Info';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CurrentUserRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById('app'),
);

function CurrentUserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Info />
        </Route>
        <Route path="/待处理">
          <CheckList />
        </Route>
        <Route path="/登录">
          <SignIn />
        </Route>
        <Route path="/修改密码">
          <ChangePassword />
        </Route>
      </Switch>
    </Router>
  );
}
