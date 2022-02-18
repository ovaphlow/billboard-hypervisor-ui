import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function JobDetail() {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = React.useState('');
  const [job, setJob] = React.useState({});

  React.useEffect(() => {
    if (!location) return;
    setUUID(new URLSearchParams(location.search).get('uuid'));
  }, [location]);

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/biz/job/${id}?uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
      });
  }, [id, uuid]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card left-nav h-100">
                <LeftNav component_option="企业用户" />
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
                  <span className="h1">岗位</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a
                          href="home.html"
                          className="text-reset text-decoration-none"
                        >
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a
                          href="employer.html"
                          className="text-reset text-decoration-none"
                        >
                          企业用户
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a
                          href="enterprise.html"
                          className="text-reset text-decoration-none"
                        >
                          企业
                        </a>
                      </li>
                      <li className="breadcrumb-item active">岗位</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-3">岗位</dt>
                      <dd className="col-9 lead">{job.name}</dd>

                      <hr />

                      <dt className="col-3">人数</dt>
                      <dd className="col-9">{job.qty}</dd>

                      <dt className="col-3">地址</dt>
                      <dd className="col-9">
                        <ul className="list-inline">
                          <li className="list-inline-item">{job.address1}</li>
                          <li className="list-inline-item">{job.address2}</li>
                          <li className="list-inline-item">{job.address3}</li>
                        </ul>
                      </dd>

                      <dt className="col-3">发布日期</dt>
                      <dd className="col-9">{job.date}</dd>

                      <dt className="col-3">薪资范围</dt>
                      <dd className="col-9">
                        {job.salary1}-{job.salary2}
                      </dd>

                      <dt className="col-3">发布日期</dt>
                      <dd className="col-9">{job.date}</dd>

                      <dt className="col-3">学历</dt>
                      <dd className="col-9">{job.education}</dd>

                      <dt className="col-3">类别</dt>
                      <dd className="col-9">{job.category}</dd>

                      <dt className="col-3">工作职责</dt>
                      <dd
                        className="col-9"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />

                      <dt className="col-3">岗位要求</dt>
                      <dd
                        className="col-9"
                        dangerouslySetInnerHTML={{ __html: job.requirement }}
                      />
                    </dl>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          window.history.back();
                        }}
                      >
                        返回
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
