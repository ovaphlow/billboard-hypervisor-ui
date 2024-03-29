import React from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';

export default function List() {
  const auth = useSelector((state) => state.auth);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/bulletin?option=bulletin')
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
                <LeftNav component_option="通知/公告" />
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
                  <span className="h1">通知 公告</span>
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
                      <li className="breadcrumb-item active">通知公告</li>
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
                      <caption>通知/公告</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>标题</th>
                          <th>用户类型</th>
                          <th>截止日期</th>
                          <th>内容</th>
                          <th>地区</th>
                          <th>行业</th>
                          <th>学历</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <span className="float-left">
                                <a href={`#/${it.id}?uuid=${it.uuid}`}>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    fixedWidth
                                    size="lg"
                                  />
                                </a>
                              </span>
                              {it.id}
                            </td>
                            <td>{it.title}</td>
                            <td>
                              {it.receiver === '企业用户' && (
                                <span className="badge bg-success">
                                  {it.receiver}
                                </span>
                              )}

                              {it.receiver === '个人用户' && (
                                <span className="badge bg-info">
                                  {it.receiver}
                                </span>
                              )}
                            </td>
                            <td>{dayjs(it.dday).format('YYYY-MM-DD')}</td>
                            <td>{it.doc.content}</td>
                            <td>
                              {it.doc.address_level1}
                              <br />
                              {it.doc.address_level2}
                            </td>
                            <td>
                              {it.receiver === '企业用户' && it.doc.industry}
                            </td>
                            <td>
                              {it.receiver === '个人用户' && it.doc.education}
                            </td>
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
