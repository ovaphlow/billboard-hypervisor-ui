import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faSearch,
  faSyncAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_filter = {
  title: '',
  date: '',
};

export default function CampusList() {
  const auth = useAuth();
  const [list, setList] = React.useState([]);
  const [filter, dispatch] = React.useReducer(reducer, initial_filter);
  const handleFilter = () => {
    setList([]);
    fetch(
      `/api/bulletin?option=campus&title=${filter.title}&date=${filter.date}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  };

  React.useEffect(() => {
    handleFilter();
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
                <LeftNav component_option="校园招聘" />
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
                  <span className="h1">校园招聘</span>
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
                      <li className="breadcrumb-item active">校园招聘</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-auto">
                        <a href="#/campus/新增" className="btn btn-secondary">
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            fixedWidth
                            size="lg"
                          />
                          新增
                        </a>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">标题</span>
                          </div>
                          <input
                            type="text"
                            value={filter.title}
                            className="form-control"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'title',
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
                            <span className="input-group-text">日期</span>
                          </div>
                          <input
                            type="date"
                            value={filter.date}
                            className="form-control"
                            onChange={(event) =>
                              dispatch({
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
                            onClick={() => window.location.reload(true)}
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
                      <caption>校园招聘</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>类型</th>
                          <th>院校</th>
                          <th>标题</th>
                          <th>时间</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <span className="float-left">
                                <a href={`#/campus/${it.id}?uuid=${it.uuid}`}>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    fixedWidth
                                    size="lg"
                                  />
                                </a>
                              </span>
                              {it.id}
                            </td>
                            <td>{it.category}</td>
                            <td>{it.school}</td>
                            <td>{it.title}</td>
                            <td>
                              {dayjs(it.date).format('YYYY-MM-DD')}
                              <br />
                              {it.time}
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
