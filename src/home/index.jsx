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
  const [state, dispatch] = React.useReducer(reducer, {
    candidate_today: 0,
    candidate_all: 0,
    candidate_send_all: 0,
    candidate_send_today: 0,
    employer_today: 0,
    employer_all: 0,
    employer_job_all: 0,
    employer_job_today: 0,
    bulletin_tuijian_today: 0,
    bulletin_tuijian_all: 0,
    bulletin_campus_all: 0,
    bulletin_campus_today: 0,
  });

  React.useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      location.href = SIGN_IN_URL;
      return;
    }
  });

  React.useEffect(() => {
    fetch('/api/biz/candidate/statistic?option=qty-by-total-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_all', value: data.total + 200000 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'candidate_today', value: data.today },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/employer/statistic?option=qty-by-total-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_today', value: data.today },
        });
        dispatch({
          type: 'set',
          payload: { key: 'employer_all', value: data.total + 60000 },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/send-in/statistic?option=qty-by-total-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_send_all', value: data.total + 180018 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'candidate_send_today', value: data.today },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/biz/job/statistic?option=qty-by-total-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_job_all', value: data.total },
        });
        dispatch({
          type: 'set',
          payload: { key: 'employer_job_today', value: data.today },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/bulletin/statistic?option=notification-qty-by-total-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_tuijian_all', value: data.total },
        });
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_tuijian_today', value: data.today },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/bulletin/statistic?option=campus-qty-by-total-today')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_campus_all', value: data.total },
        });
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_campus_today', value: data.today },
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
                        <p className="lead">简历投递次数 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.candidate_send_today}
                          <hr />
                          {state.candidate_send_all}
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

                <div className="row mt-4 d-flex justify-content-between">
                  <div className="col-4">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">岗位 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.employer_job_today}
                          <hr />
                          {state.employer_job_all}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
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

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">校园招聘 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.bulletin_campus_today}
                          <hr />
                          {state.bulletin_campus_all}
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
