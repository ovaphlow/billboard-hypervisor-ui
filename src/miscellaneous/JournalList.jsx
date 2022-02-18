import React from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_filter = {
  date_begin: dayjs().format('YYYY-MM-01'),
  date_end: dayjs().format('YYYY-MM-DD'),
};

function JournalList() {
  const auth = useAuth();
  const ref_id = new URLSearchParams(useLocation().search).get('ref_id');
  const tag = new URLSearchParams(useLocation().search).get('tag');
  const [filter, dispatch] = React.useReducer(reducer, initial_filter);
  const [journal_list, setJournalList] = React.useState([]);
  const handleFilter = () => {
    let url = [
      '/api/miscellaneous/journal',
      '?option=ref_id-tag-date',
      `&id=${ref_id}`,
      `&tag=${tag}`,
      `&date_begin=${filter.date_begin}`,
      `&date_end=${dayjs(filter.date_end).add(1, 'day').format('YYYY-MM-DD')}`,
    ];
    fetch(url.join(''))
      .then((response) => response.json())
      .then((data) => {
        setJournalList(data);
      });
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="操作记录" />
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
                        history.back();
                      }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">操作记录</span>
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
                      <li className="breadcrumb-item">操作记录</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">起</span>
                          </div>
                          <input
                            type="date"
                            value={filter.date_begin}
                            aria-label="起"
                            className="form-control"
                            onChange={(event) => {
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date_begin',
                                  value: event.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">止</span>
                          </div>
                          <input
                            type="date"
                            value={filter.date_end || ''}
                            aria-label="止"
                            className="form-control"
                            onChange={(event) => {
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date_end',
                                  value: event.target.value,
                                },
                              });
                            }}
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
                            <FontAwesomeIcon
                              icon={faSearch}
                              fixedWidth
                              size="lg"
                            />
                            查询
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              location.reload(true);
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
                      <caption>操作记录</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {journal_list.map((current) => (
                          <tr key={current.id}>
                            <td>{current.id}</td>
                            <td>
                              {dayjs(current.dtime).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )}
                            </td>
                            <td>{current.category}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>时间</th>
                          <th>操作</th>
                        </tr>
                      </tfoot>
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

export default JournalList;
