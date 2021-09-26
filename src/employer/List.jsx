import React from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useMessageQty from '../useMessageQty';
import useAuth from '../useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt, faEdit, faLink } from '@fortawesome/free-solid-svg-icons';

export default function List() {
  const auth = useAuth();
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });
  const [list, setList] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [flag, setFlag] = React.useState(false);
  const handleFilter = async () => {
    setList([]);
    fetch(`/api/biz/employer?option=&keyword=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setFlag(true);
      });
  };

  React.useEffect(() => {
    if (!flag) return;
    const ll = list.map((iter) => iter.id);
    fetch(`/api/biz/employer?option=filter-user-by-id-list&list=${ll.join(',')}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = list.map((current) => {
          const user = data.find((element) => element.enterprise_id === current.id);
          return {
            ...current,
            user_id: 0 || (user && user.id),
            user_uuid: '' || (user && user.uuid),
            user_name: '' || (user && user.name),
            user_email: '' || (user && user.email),
            user_phone: '' || (user && user.phone),
          };
        });
        setFlag(false);
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
                  <span className="h1">企业用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">企业用户</li>
                    </ol>
                  </nav>
                </div>

                {parseInt(message_qty, 10) > 0 && (
                  <div className="alert alert-warning">
                    有 {message_qty} 个待认证企业需要
                    <a href="current-user.html#/待处理">处理</a>。
                  </div>
                )}

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">姓名/电话/企业</span>
                          </div>
                          <input
                            type="text"
                            value={filter}
                            className="form-control"
                            onChange={(event) => setFilter(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="btn-group col-auto">
                        <button type="button" className="btn btn-info" onClick={handleFilter}>
                          <FontAwesomeIcon icon={faSearch} fixedWidth size="lg" />
                          查询
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            window.location.reload(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faSyncAlt} fixedWidth size="lg" />
                          重置
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>企业用户</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>名称</th>
                          <th>固定电话</th>
                          <th>账号</th>
                          <th>手机/EMAIL</th>
                          <th>操作</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>{it.name}</td>
                            <td>{it.phone}</td>
                            <td>{it.user_name}</td>
                            <td>
                              {it.user_phone}
                              <br />
                              {it.user_email}
                            </td>
                            <td>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <a href={`#/${it.id}?uuid=${it.uuid}`} className="float-left">
                                    企业信息
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href={`#/账号/${it.user_id}?uuid=${it.user_uuid}`}
                                    className="float-left"
                                  >
                                    账号信息
                                  </a>
                                </li>
                              </ul>
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
