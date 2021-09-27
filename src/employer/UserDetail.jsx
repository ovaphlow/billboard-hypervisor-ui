import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import ComponentEmployerFavoriteList from '../miscellaneous/ComponentEmployerFavoriteList';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_user = {
  name: '',
  phone: '',
  email: '',
};

export default function UserDetail() {
  const auth = useAuth();
  const { id } = useParams();
  const [user, dispatch] = React.useReducer(reducer, initial_user);
  const uuid = new URLSearchParams(useLocation().search).get('uuid');

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/biz/employer/${id}?option=user-by-employer&uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'set', payload: { key: 'name', value: data.name } });
        dispatch({ type: 'set', payload: { key: 'phone', value: data.phone } });
        dispatch({ type: 'set', payload: { key: 'email', value: data.email } });
      });
  }, [id, uuid]);

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
                      <li className="breadcrumb-item">
                        <a href="enterprise-user" className="text-reset text-decoration-none">
                          企业用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">账号信息</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-3">名称</dt>
                      <dd className="col-9 lead">{user.name}</dd>

                      <hr />

                      <dt className="col-3">手机</dt>
                      <dd className="col-9">{user.phone}</dd>

                      <dt className="col-3">EMAIL</dt>
                      <dd className="col-9">{user.email}</dd>
                    </dl>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          window.history.back();
                        }}
                      >
                        返回
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">
                    <span className="lead">收藏</span>
                  </div>

                  <div className="card-body">
                    <ComponentEmployerFavoriteList user_id={id} />
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
