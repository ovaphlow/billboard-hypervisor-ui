import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import RecruitmentList from '../recruitment/component/List';
import RecruitmentList1 from '../recruitment/component/List1';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_employer = {
  name: '',
  faren: '',
  yingyezhizhao: '',
  zhuceriqi: '',
  zhuziguimo: '',
  yuangongshuliang: '',
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  industry: '',
  phone: '',
  intro: '',
  url: '',
  status: '',
  yingyezhizhao_tu: '',
};

export default function Detail({ component_option }) {
  const [employer, dispatch] = React.useReducer(reducer, initial_employer);
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = React.useState('');

  React.useEffect(() => {
    if (component_option === '编辑') {
      setUUID(new URLSearchParams(location.search).get('uuid'));
    }
  });

  React.useEffect(() => {
    if (uuid) {
      fetch(`/api/enterprise/${id}?uuid=${uuid}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'set', payload: { key: 'name', value: data.content.name } });
          dispatch({ type: 'set', payload: { key: 'faren', value: data.content.faren } });
          dispatch({
            type: 'set',
            payload: { key: 'yingyezhizhao', value: data.content.yingyezhizhao },
          });
          dispatch({ type: 'set', payload: { key: 'zhuceriqi', value: data.content.zhuceriqi } });
          dispatch({ type: 'set', payload: { key: 'zhuziguimo', value: data.content.zhuziguimo } });
          dispatch({
            type: 'set',
            payload: { key: 'yuangongshuliang', value: data.content.yuangongshuliang },
          });
          dispatch({ type: 'set', payload: { key: 'address1', value: data.content.address1 } });
          dispatch({ type: 'set', payload: { key: 'address2', value: data.content.address2 } });
          dispatch({ type: 'set', payload: { key: 'address3', value: data.content.address3 } });
          dispatch({ type: 'set', payload: { key: 'address4', value: data.content.address4 } });
          dispatch({ type: 'set', payload: { key: 'industry', value: data.content.industry } });
          dispatch({ type: 'set', payload: { key: 'phone', value: data.content.phone } });
          dispatch({ type: 'set', payload: { key: 'intro', value: data.content.intro } });
          dispatch({ type: 'set', payload: { key: 'url', value: data.content.url } });
          dispatch({ type: 'set', payload: { key: 'status', value: data.content.status } });
          dispatch({
            type: 'set',
            payload: { key: 'yingyezhizhao_tu', value: data.content.yingyezhizhao_tu },
          });
        });
    }
  }, [uuid]);

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
                      onClick={() => window.history.back()}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">企业</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="enterprise-user.html" className="text-reset text-decoration-none">
                          企业用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">企业</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-3">名称</dt>
                      <dd className="col-9 lead">
                        {employer.status === '认证' && (
                          <>
                            <span class="badge bg-success pull-right">{employer.status}</span>
                            &nbsp;
                          </>
                        )}
                        {employer.name}
                      </dd>

                      <hr />

                      <dt className="col-3">法人</dt>
                      <dd className="col-9">{employer.faren}</dd>

                      <dt className="col-3">营业执照</dt>
                      <dd className="col-9">{employer.yingyezhizhao}</dd>

                      <dt className="col-3">注册日期</dt>
                      <dd className="col-9">{employer.zhuceriqi}</dd>

                      <dt className="col-3">注资规模</dt>
                      <dd className="col-9">{employer.zhuziguimo}</dd>

                      <dt className="col-3">员工数量</dt>
                      <dd className="col-9">{employer.yuangongshuliang}</dd>

                      <hr />

                      <dt className="col-3">地址</dt>
                      <dd className="col-9">
                        <ul className="list-inline">
                          <li className="list-inline-item">{employer.address1}</li>
                          <li className="list-inline-item">{employer.address2}</li>
                          <li className="list-inline-item">{employer.address3}</li>
                          <li className="list-inline-item">{employer.address4}</li>
                        </ul>
                      </dd>

                      <dt className="col-3">所属行业</dt>
                      <dd className="col-9">{employer.industry}</dd>

                      <dt className="col-3">电话号码</dt>
                      <dd className="col-9">{employer.phone}</dd>

                      <dt className="col-3">网址</dt>
                      <dd className="col-9">{employer.url}</dd>

                      <dt className="col-3">简介</dt>
                      <dd className="col-9" dangerouslySetInnerHTML={{ __html: employer.intro }} />

                      {employer.status !== '认证' && (
                        <>
                          <dt className="col-3">营业执照</dt>
                          <dd className="col-9">
                            <img
                              src={employer.yingyezhizhao_tu}
                              className="img-fluid"
                              alt={employer.name}
                            />
                          </dd>
                        </>
                      )}
                    </dl>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          window.history.go(-1);
                        }}
                      >
                        返回
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">发布的岗位</div>
                  <div className="card-body">
                    <RecruitmentList enterprise_id={id} enterprise_uuid={uuid} />
                  </div>
                </div>
                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">收到的简历</div>
                  <div className="card-body">
                    <RecruitmentList1 enterprise_id={id} enterprise_uuid={uuid} />
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

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
