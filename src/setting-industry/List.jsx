import React, { useState, useEffect } from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function List() {
  const auth = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/settings/industry/');
      const res = await response.json();
      setList(res.content);
    })();
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
              <div className="card bg-dark h-100">
                <LeftNav component_option="系统设定：行业" />
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
                  <span className="h1">系统设定：行业</span>
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
                      <li className="breadcrumb-item active">系统设定：行业</li>
                    </ol>
                  </nav>
                </div>
                <div className="card shadow bg-dark h-100">
                  <div className="card-header">
                    <a href="#/新增" className="btn btn-sm btn-secondary">
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        fixedWidth
                        size="lg"
                      />
                      新增
                    </a>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>名称</th>
                          <th>备注</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td>
                              <a href={`#/${it.id}?uuid=${it.uuid}`}>
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  fixedWidth
                                  size="lg"
                                />
                              </a>
                              <span className="float-right">{it.id}</span>
                            </td>
                            <td>{it.name}</td>
                            <td>{it.comment}</td>
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
