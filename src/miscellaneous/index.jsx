import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import FeedbackList from './FeedbackList';

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
        <Route path="/feedback">
          <FeedbackList />
        </Route>
      </Switch>
    </Router>
  );
}
