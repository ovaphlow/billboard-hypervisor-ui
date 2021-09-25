import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import '../style.css';
import CandidateList from './CandidateList';
import CandidateDetail from './CandidateDetail';
import ResumeDetail from './ResumeDetail';
import SendInList from './SendInList';
import JobDetail from './JobDetail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/candidate">
          <CandidateList />
        </Route>

        <Route path="/candidate/:id">
          <CandidateDetail />
        </Route>

        <Route path="/job/:id">
          <JobDetail />
        </Route>

        <Route path="/resume/:id">
          <ResumeDetail />
        </Route>

        <Route path="/send-in">
          <SendInList />
        </Route>
      </Switch>
    </Router>
  );
}
