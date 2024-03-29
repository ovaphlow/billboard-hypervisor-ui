import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import { BANNER_CATEGORY } from '../constant';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_filter = {
  category: '小程序-首页',
  status: '启用',
};

export default function List() {
  const auth = useAuth();
  const [banner_list, setBannerList] = React.useState([]);
  const [filter, dispatch] = React.useReducer(reducer, initial_filter);

  const handleFilter = async () => {
    setBannerList([]);
    fetch(
      `/api/bulletin?option=banner&category=${filter.category}&status=${filter.status}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setBannerList(data);
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
              <div className="card left-nav h-100">
                <LeftNav component_option="BANNER" />
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
                  <span className="h1">BANNER</span>
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
                      <li className="breadcrumb-item active">BANNER</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-auto">
                        <a href="#/banner/新增" className="btn btn-secondary">
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
                            <span className="input-group-text">类别</span>
                          </div>
                          <select
                            value={filter.category}
                            className="form-control"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'category',
                                  value: event.target.value,
                                },
                              })
                            }
                          >
                            {BANNER_CATEGORY.map((it) => (
                              <option
                                key={BANNER_CATEGORY.indexOf(it)}
                                value={it}
                              >
                                {it}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">状态</span>
                          </div>
                          <select
                            value={filter.status}
                            className="form-control"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'status',
                                  value: event.target.value,
                                },
                              })
                            }
                          >
                            <option value="启用">启用</option>
                            <option value="未启用">未启用</option>
                          </select>
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
                            检索
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      {banner_list.map((it) => (
                        <div
                          key={it.id}
                          className="card bg-secondary m-2"
                          style={{ width: '18rem' }}
                        >
                          <img
                            src={it.data_url}
                            className="card-img-top"
                            alt={it.title}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {it.title}
                              <span className="float-right">
                                {it.status === '启用' ? (
                                  <span className="badge bg-success">
                                    {it.status}
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">
                                    {it.status}
                                  </span>
                                )}
                              </span>
                            </h5>
                          </div>

                          <div className="card-footer text-center">
                            <a
                              href={`#/banner/${it.id}?uuid=${it.uuid}`}
                              className="btn btn-info btn-sm"
                            >
                              查看
                            </a>
                          </div>
                        </div>
                      ))}
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
