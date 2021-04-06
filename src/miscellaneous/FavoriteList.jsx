import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function FavoriteList() {
  const auth = useAuth();
  const location = useLocation();
  const [favorite_list, setFavoriteList] = useState([]);

  useEffect(() => {
    const master_id = new URLSearchParams(location.search).get('master_id');
    if (!master_id) return;
    fetch(`/api/miscellaneous/favorite/filter?master_id=${master_id}&category=个人用户`)
      .then((response) => response.json())
      .then((data) => {
        console.info(data);
        setFavoriteList(data);
      });
  }, [location]);

  const handleRedirect2Resource = async (event) => {
    const t_cat = event.target.getAttribute('data-category');
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    if (t_cat === '推荐信息') {
      window.location = `bulletin.html#/notification/${id}?uuid=${uuid}`;
    } else if (t_cat === '校园招聘') {
      window.location = `bulletin.html#/campus/${id}?uuid=${uuid}`;
    } else if (t_cat === '岗位') {
      window.location = `biz.html#/job/${id}?uuid=${uuid}`;
    } else {
      window.alert('未知类型，解析失败。');
    }
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
                  <span className="h1">用户收藏</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="common-user.html" className="text-reset text-decoration-none">
                          个人用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">用户收藏</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>用户收藏</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>类型</th>
                          <th>时间</th>
                          <th>内容</th>
                        </tr>
                      </thead>

                      <tbody>
                        {favorite_list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>{it.category2}</td>
                            <td>
                              {dayjs(it.datime).format('YYYY-MM-DD')}
                              &nbsp;
                              <span className="text-muted">
                                {dayjs(it.datime).format('HH:mm:ss')}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-sm"
                                data-id={it.data_id}
                                data-uuid={it.data_uuid}
                                data-category={it.category2}
                                onClick={handleRedirect2Resource}
                              >
                                查看
                              </button>
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
