import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function FairList() {
  const auth = useAuth();
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/bulletin?option=fair')
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

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
                <LeftNav component_option="线上招聘会" />
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
                  <span className="h1">线上招聘会</span>
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
                      <li className="breadcrumb-item active">线上招聘会</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <a href="#/fair/新增" className="btn btn-secondary">
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            fixedWidth
                            size="lg"
                          />
                          新增
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>线上招聘会</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>标题</th>
                          <th>时间</th>
                          <th>状态</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <a
                                href={`#/fair/${it.id}`}
                                className="float-left"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  fixedWidth
                                  size="lg"
                                />
                              </a>
                              {it.id}
                            </td>
                            <td>{it.title}</td>
                            <td>
                              {dayjs(it.datime).format('YYYY-MM-DD HH:mm')}
                            </td>
                            <td>{it.status}</td>
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
