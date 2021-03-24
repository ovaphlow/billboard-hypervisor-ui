import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import Detail from './Detail';
import List from './List';
import UserDetail from './UserDetail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

export default function Index() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route exact path="/账号/:id">
          <UserDetail component_option="编辑" />
        </Route>

        <Route exact path="/:id">
          <Detail />
        </Route>
      </Switch>
    </Router>
  );
}
