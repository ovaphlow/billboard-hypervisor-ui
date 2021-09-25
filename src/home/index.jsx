import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../style.css';
import { SIGN_IN_URL } from '../constant';
import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_state = {
  candidate_today: 0,
  candidate_all: 0,
  candidate_send: 0,
  employer_today: 0,
  employer_all: 0,
  employer_job: 0,
  bulletin_tuijian_today: 0,
  bulletin_tuijian_all: 0,
};

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const auth = useAuth();
  const [state, dispatch] = React.useReducer(reducer, initial_state);

  React.useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
      return;
    }
  });

  React.useEffect(() => {
    fetch('/api/biz/candidate/statistic?option=today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_today', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/candidate/statistic?option=all')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_all', value: data.qty + 200000 },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/employer/statistic?option=today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_today', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/employer/statistic?option=all')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_all', value: data.qty + 60000 },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/send-in/statistic?option=all')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_send', value: data.qty + 180018 },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/job/statistic?option=all')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_job', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/bulletin/statistic?option=tuijian-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_tuijian_today', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/bulletin/statistic?option=tuijian-all')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_tuijian_all', value: data.qty },
        });
      });
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="首页" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card left-nav h-100">
                <LeftNav component_option="" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => {
                        window.history.back();
                      }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">首页</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item active">首页</li>
                    </ol>
                  </nav>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">用户 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.candidate_today}
                          <hr />
                          {state.candidate_all}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">简历投递次数 / 岗位</p>
                        <h1 className="display-1 text-center">
                          {state.candidate_send}
                          <hr />
                          {state.employer_job}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">企业 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.employer_today}
                          <hr />
                          {state.employer_all}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4 d-flex justify-content-center">
                  <div className="col-4">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">推荐信息 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.bulletin_tuijian_today}
                          <hr />
                          {state.bulletin_tuijian_all}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
