import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

// to-do: 2021-10-04 remove

export default function List({ component_option }) {
  const auth = useAuth();
  const location = useLocation();
  const [user_category, setUserCategory] = React.useState('');
  const [user_id, setUserID] = React.useState(0);
  const [user_uuid, setUserUUID] = React.useState('');
  const [data, setData] = React.useState([]);
  const [filter_date_begin, setFilterDateBegin] = React.useState(
    dayjs().format('YYYY-MM-01'),
  );
  const [filter_date_end, setFilterDateEnd] = React.useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const handleRedirect = async (event) => {
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    const category = event.target.getAttribute('data-category');
    if (category === '校园招聘') {
      window.location = `campus.html#/${id}?uuid=${uuid}`;
    } else if (category === '热门话题') {
      window.location = `topic.html#/${id}?uuid=${uuid}`;
    } else if (category === '岗位') {
      window.location = `recruitment.html#/${id}?uuid=${uuid}`;
    } else {
      window.alert('数据类型解析失败');
    }
  };
  const handleFilter = async () => {
    if (component_option === '登录') {
      let url = [
        '/api/miscellaneous/journal',
        '?option=sign-in-by-date',
        `&id=${user_id}`,
        `&uuid=${user_uuid}`,
        `&category=${user_category}`,
        `&date_begin=${filter_date_begin}`,
        `&date_end=${filter_date_end}`,
      ];
      fetch(url.join(''))
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else if (component_option === '浏览') {
      let url = [
        '/api/miscellaneous/journal',
        '?option=browse-by-date',
        `&id=${user_id}`,
        `&uuid=${user_uuid}`,
        `&date_begin=${filter_date_begin}`,
        `&date_end=${filter_date_end}`,
      ];
      fetch(url.join(''))
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else if (component_option === '编辑') {
      let url = [
        '/api/miscellaneous/journal',
        '?option=edit-by-date',
        `&id=${user_id}`,
        `&date_begin=${filter_date_begin}`,
        `&date_end=${filter_date_end}`,
      ];
      fetch(url.join(''))
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  };

  React.useEffect(() => {
    let _user_category = new URLSearchParams(location.search).get(
      'user_category',
    );
    let _user_id = new URLSearchParams(location.search).get('user_id');
    let _user_uuid = new URLSearchParams(location.search).get('user_uuid');
    setUserCategory(new URLSearchParams(location.search).get('user_category'));
    setUserID(new URLSearchParams(location.search).get('user_id'));
    setUserUUID(new URLSearchParams(location.search).get('user_uuid'));
    if (!_user_category || !_user_id || !_user_uuid) {
      window.alert('参数错误');
      return;
    }
    if (component_option === '登录') {
      let url = [
        '/api/miscellaneous/journal',
        '?option=sign-in',
        `&id=${_user_id}`,
        `&uuid=${_user_uuid}`,
        `&category=${_user_category}`,
      ];
      fetch(url.join(''))
        .then((response) => response.json())
        .then((data) => {
          console.info(data);
          setData(data);
        });
    } else if (component_option === '浏览') {
      let url = [
        '/api/miscellaneous/journal',
        '?option=browse',
        `&id=${_user_id}`,
        `&uuid=${_user_uuid}`,
        `&category=${_user_category}`,
      ];
      fetch(url.join(''))
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else if (component_option === '编辑') {
      let url = [
        '/api/miscellaneous/journal',
        '?option=edit',
        `&id=${_user_id}`,
        `&uuid=${_user_uuid}`,
      ];
      fetch(url.join(''))
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
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
                        window.history.back();
                      }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">
                    操作记录：
                    {component_option}
                  </span>
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
                      <li className="breadcrumb-item">
                        操作记录：
                        {component_option}
                      </li>
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
                            value={filter_date_begin || ''}
                            aria-label="起"
                            className="form-control"
                            onChange={(event) =>
                              setFilterDateBegin(event.target.value)
                            }
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
                            value={filter_date_end || ''}
                            aria-label="止"
                            className="form-control"
                            onChange={(event) =>
                              setFilterDateEnd(event.target.value)
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
                            onClick={() => {
                              window.location.reload(true);
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
                      <caption>
                        {component_option}
                        记录
                      </caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          {component_option === '登录' && (
                            <>
                              <th>时间</th>
                              <th>IP地址</th>
                              <th>大概位置</th>
                              <th>用户类别</th>
                            </>
                          )}
                          {component_option === '浏览' && (
                            <>
                              <th>时间</th>
                              <th>数据类别</th>
                              <th className="text-right">操作</th>
                            </>
                          )}
                          {component_option === '编辑' && (
                            <>
                              <th>时间</th>
                              <th>用户类别</th>
                              <th>操作内容</th>
                            </>
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {component_option === '登录' &&
                          data.map((it) => (
                            <tr key={it.id}>
                              <td className="text-right">{it.id}</td>
                              <td>
                                {dayjs(it.datime).format('YYYY-MM-DD HH:mm:ss')}
                              </td>
                              <td>{it.ip}</td>
                              <td>{it.address}</td>
                              <td>{it.category}</td>
                            </tr>
                          ))}
                        {component_option === '浏览' &&
                          data.map((it) => (
                            <tr key={it.id}>
                              <td className="text-right">{it.id}</td>
                              <td>
                                {dayjs(it.datime).format('YYYY-MM-DD HH:mm:ss')}
                              </td>
                              <td>{it.category}</td>
                              <td className="text-right">
                                <button
                                  type="button"
                                  data-id={it.data_id}
                                  data-uuid={it.data_uuid}
                                  data-category={it.category}
                                  className="btn btn-sm btn-outline-info"
                                  onClick={handleRedirect}
                                >
                                  查看
                                </button>
                              </td>
                            </tr>
                          ))}
                        {component_option === '编辑' &&
                          data.map((it) => (
                            <tr key={it.id}>
                              <td className="text-right">{it.id}</td>
                              <td>
                                {dayjs(it.datime).format('YYYY-MM-DD HH:mm:ss')}
                              </td>
                              <td>{it.category1}</td>
                              <td>{it.category2}</td>
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

List.propTypes = {
  component_option: PropTypes.string.isRequired,
};
