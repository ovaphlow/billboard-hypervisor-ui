import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import RecruitmentList from './ComponentJobList';
import ComponentJobNResumeList from './ComponentJobNResumeList';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';
import dayjs from 'dayjs';

const initial_employer = {
  name: '',
  faren: '',
  yingyezhizhao: '',
  zhuceriqi: '',
  zhuziguimo: '',
  yuangongshuliang: '',
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  industry: '',
  phone: '',
  intro: '',
  url: '',
  status: '',
  yingyezhizhao_tu: '',
};

const initial_job_filter = {
  date: dayjs().format('YYYY-MM-01'),
  date2: dayjs().format('YYYY-MM-DD'),
};

export default function Detail() {
  const auth = useAuth();
  const { id } = useParams();
  const uuid = new URLSearchParams(useLocation().search).get('uuid');
  const [employer, dispatch] = React.useReducer(reducer, initial_employer);
  const [job_filter, dispatch_job_filter] = React.useReducer(
    reducer,
    initial_job_filter,
  );
  const [job_list, setJobList] = React.useState([]);
  const [sendin_list, setSendInList] = React.useState([]);
  const [progress, setProgress] = React.useState(0);
  const handleJobFilter = () => {
    let a = job_list.map((current) => current.id);
    let url = [
      '/api/biz/send-in?option=by-job-id-and-date',
      `&list=${a.join(',')}`,
      `&date=${job_filter.date}`,
      `&date2=${job_filter.date2}`,
    ];
    fetch(url.join(''))
      .then((response) => response.json())
      .then((data) => {
        // 原代码
        // setSendInList(data);
        // if (data.length) setProgress(1);
        // 修改为下方代码，减少progress === 1的步骤
        let lf = data.map((current) => {
          let job = job_list.find(
            (element) => element.id === current.recruitment_id,
          );
          return {
            ...current,
            recruitment_name: job.name,
          };
        });
        setSendInList(lf);
        setProgress(2);
      });
  };

  React.useEffect(() => {
    if (!uuid) return;
    fetch(`/api/biz/employer/${id}?option=&uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'set', payload: { key: 'name', value: data.name } });
        dispatch({ type: 'set', payload: { key: 'faren', value: data.faren } });
        dispatch({
          type: 'set',
          payload: { key: 'yingyezhizhao', value: data.yingyezhizhao },
        });
        dispatch({
          type: 'set',
          payload: { key: 'zhuceriqi', value: data.zhuceriqi },
        });
        dispatch({
          type: 'set',
          payload: { key: 'zhuziguimo', value: data.zhuziguimo },
        });
        dispatch({
          type: 'set',
          payload: { key: 'yuangongshuliang', value: data.yuangongshuliang },
        });
        dispatch({
          type: 'set',
          payload: { key: 'address1', value: data.address1 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'address2', value: data.address2 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'address3', value: data.address3 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'address4', value: data.address4 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'industry', value: data.industry },
        });
        dispatch({ type: 'set', payload: { key: 'phone', value: data.phone } });
        dispatch({ type: 'set', payload: { key: 'intro', value: data.intro } });
        dispatch({ type: 'set', payload: { key: 'url', value: data.url } });
        dispatch({
          type: 'set',
          payload: { key: 'status', value: data.status },
        });
        dispatch({
          type: 'set',
          payload: { key: 'yingyezhizhao_tu', value: data.yingyezhizhao_tu },
        });
      });
  }, [uuid]);

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/biz/job?option=list-by-employer-id&id=${id}&uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        setJobList(data);
      });
  }, [id, uuid]);

  React.useEffect(() => {
    if (progress === 1) {
      // job
      let job_id_list = sendin_list.map((current) => current.recruitment_id);
      fetch(`/api/biz/job?option=by-id&list=${job_id_list.join(',')}`)
        .then((response) => response.json())
        .then((data) => {
          let lf = sendin_list.map((current) => {
            let job = data.find(
              (element) => element.id === current.recruitment_id,
            );
            return {
              ...current,
              recruitment_name: job.name,
            };
          });
          setSendInList(lf);
          setProgress(2);
        });
    } else if (progress === 2) {
      // resume
      let resume_id_list = sendin_list.map((current) => current.resume_id);
      fetch(`/api/biz/resume?option=by-id&list=${resume_id_list.join(',')}`)
        .then((response) => response.json())
        .then((data) => {
          let lf = sendin_list.map((current) => {
            let resume = data.find(
              (element) => element.id === current.resume_id,
            );
            return {
              ...current,
              resume_name: resume.name,
            };
          });
          setSendInList(lf);
          setProgress(0);
        });
    }
  }, [progress]);

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
                      onClick={() => window.history.back()}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">企业</span>
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
                      <li className="breadcrumb-item active">企业</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-3">名称</dt>
                      <dd className="col-9 lead">
                        {employer.status === '认证' && (
                          <>
                            <span className="badge bg-success pull-right">
                              {employer.status}
                            </span>
                            &nbsp;
                          </>
                        )}
                        {employer.name}
                      </dd>

                      <hr />

                      <dt className="col-3">法人</dt>
                      <dd className="col-9">{employer.faren}</dd>

                      <dt className="col-3">营业执照</dt>
                      <dd className="col-9">{employer.yingyezhizhao}</dd>

                      <dt className="col-3">注册日期</dt>
                      <dd className="col-9">{employer.zhuceriqi}</dd>

                      <dt className="col-3">注资规模</dt>
                      <dd className="col-9">{employer.zhuziguimo}</dd>

                      <dt className="col-3">员工数量</dt>
                      <dd className="col-9">{employer.yuangongshuliang}</dd>

                      <hr />

                      <dt className="col-3">地址</dt>
                      <dd className="col-9">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            {employer.address1}
                          </li>
                          <li className="list-inline-item">
                            {employer.address2}
                          </li>
                          <li className="list-inline-item">
                            {employer.address3}
                          </li>
                          <li className="list-inline-item">
                            {employer.address4}
                          </li>
                        </ul>
                      </dd>

                      <dt className="col-3">所属行业</dt>
                      <dd className="col-9">{employer.industry}</dd>

                      <dt className="col-3">电话号码</dt>
                      <dd className="col-9">{employer.phone}</dd>

                      <dt className="col-3">网址</dt>
                      <dd className="col-9">{employer.url}</dd>

                      <dt className="col-3">简介</dt>
                      <dd
                        className="col-9"
                        dangerouslySetInnerHTML={{ __html: employer.intro }}
                      />

                      {employer.status !== '认证' && (
                        <>
                          <dt className="col-3">营业执照</dt>
                          <dd className="col-9">
                            <img
                              src={employer.yingyezhizhao_tu || ''}
                              className="img-fluid"
                              alt={employer.name}
                            />
                          </dd>
                        </>
                      )}
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

                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">发布的岗位</div>
                  <div className="card-body">
                    <RecruitmentList
                      enterprise_id={id}
                      enterprise_uuid={uuid}
                    />
                  </div>
                </div>
                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">
                    <p className="lead">收到的简历</p>
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">起始日期</span>
                          </div>
                          <input
                            type="date"
                            value={job_filter.date}
                            aria-label="起始日期"
                            className="form-control"
                            onChange={(event) =>
                              dispatch_job_filter({
                                type: 'set',
                                payload: {
                                  key: 'date',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">终止日期</span>
                          </div>
                          <input
                            type="date"
                            value={job_filter.date2}
                            aria-label="终止日期"
                            className="form-control"
                            onChange={(event) =>
                              dispatch_job_filter({
                                type: 'set',
                                payload: {
                                  key: 'date2',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleJobFilter}
                          >
                            查询
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ComponentJobNResumeList data_list={sendin_list} />
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
