import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import '../style.css';
import { SIGN_IN_URL } from '../constant';
import ComplaintList from './ComplaintList';
import FeedbackList from './FeedbackList';
import StaffList from './StaffList';
import Staff from './Staff';
import FavoriteList from './FavoriteList';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  React.useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/complaint">
          <ComplaintList />
        </Route>

        <Route path="/favorite">
          <FavoriteList />
        </Route>

        <Route path="/feedback">
          <FeedbackList />
        </Route>

        <Route exact path="/staff">
          <StaffList />
        </Route>

        <Route exact path="/staff/新增">
          <Staff component_option="新增" />
        </Route>

        <Route exact path="/staff/:id">
          <Staff component_option="编辑" />
        </Route>
      </Switch>
    </Router>
  );
}
