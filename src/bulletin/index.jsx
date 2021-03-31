import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import List from './List';
import Detail from './Detail';
import FairList from './FairList';
import FairDetail from './FairDetail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

export default function Index() {
  React.useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/fair">
          <FairList />
        </Route>

        <Route exact path="/fair/新增">
          <FairDetail component_option="新增" />
        </Route>

        <Route exact path="/fair/:id">
          <FairDetail component_option="编辑" />
        </Route>

        <Route exact path="/">
          <List />
        </Route>

        <Route exact path="/新增">
          <Detail component_option="新增" />
        </Route>

        <Route exact path="/:id">
          <Detail component_option="编辑" />
        </Route>
      </Switch>
    </Router>
  );
}
