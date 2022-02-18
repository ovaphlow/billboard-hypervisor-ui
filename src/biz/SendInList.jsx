import React from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_param = {
  date_begin: dayjs().format('YYYY-MM-01'),
  date_end: dayjs().format('YYYY-MM-DD'),
};

export default function SendInList() {
  const auth = useAuth();
  const location = useLocation();
  const [param, dispatch] = React.useReducer(reducer, initial_param);
  const [user_id, setUserID] = React.useState(0);
  const [user_uuid, setUserUUID] = React.useState('');
  const [list, setList] = React.useState([]);
  const [flag, setFlag] = React.useState(0);

  const handleFilter = async () => {
    setList([]);
    const query =
      'option=' +
      `&id=${user_id}` +
      `&uuid=${user_uuid}` +
      `&date_begin=${param.date_begin}` +
      `&date_end=${param.date_end}`;
    fetch(`/api/biz/send-in/filter?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setFlag(1);
      });
  };

  React.useEffect(() => {
    if (!location) return;
    setUserID(new URLSearchParams(location.search).get('user_id'));
    setUserUUID(new URLSearchParams(location.search).get('user_uuid'));
  }, [location]);

  React.useEffect(() => {
    if (flag !== 1) return;
    if (list.length === 0) return;
    fetch(`/api/biz/resume/filter?option=by-candidate&id=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = list.map((current) => {
          const resume = data.find(
            (element) => element.id === current.resume_id,
          );
          return {
            ...current,
            resume_name: resume.name,
          };
        });
        setFlag(2);
        setList(lf);
      })
      .catch((err) => console.error(err.stack));
  }, [flag, list]);

  React.useEffect(() => {
    if (flag !== 2) return;
    if (list.length === 0) return;
    const ll = list.map((current) => current.recruitment_id);
    fetch(`/api/biz/job/filter?option=by-id-list&list=${ll}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = list.map((current) => {
          const job = data.find(
            (element) => element.id === current.recruitment_id,
          );
          return {
            ...current,
            job_id: job.id,
            job_uuid: job.uuid,
            job_name: job.name,
          };
        });
        setFlag(0);
        setList(lf);
      });
  }, [flag, list]);

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
                <LeftNav component_option="个人用户" />
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
                  <span className="h1">简历投递记录</span>
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
                          href="common-user.html"
                          className="text-reset text-decoration-none"
                        >
                          个人用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">简历投递记录</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">起始日期</span>
                          </div>
                          <input
                            type="date"
                            value={param.date_begin}
                            aria-label="起始日期"
                            className="form-control"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date_begin',
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
                            value={param.date_end}
                            aria-label="终止日期"
                            className="form-control"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date_end',
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
                            onClick={handleFilter}
                          >
                            查询
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSyncAlt}
                              fixedWidth
                              size="lg"
                            />
                            重置
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>简历投递记录</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>简历</th>
                          <th>岗位</th>
                          <th>日期</th>
                          <th className="text-right">状态</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>
                              <a
                                href={`#/resume/${it.resume_id}?uuid=${it.resume_uuid}`}
                              >
                                {it.resume_name}
                              </a>
                            </td>
                            <td>
                              <a
                                href={`#/job/${it.job_id}?uuid=${it.job_uuid}`}
                              >
                                {it.job_name}
                              </a>
                            </td>
                            <td>{it.datime}</td>
                            <td className="text-right">{it.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
