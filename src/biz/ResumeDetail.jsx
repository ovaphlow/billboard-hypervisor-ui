import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function ResumeDetail() {
  const auth = useAuth();
  const { id } = useParams();
  const uuid = new URLSearchParams(useLocation().search).get('uuid');
  const [resume, setResume] = React.useState({});

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/biz/resume/${id}?uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        setResume(data);
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
                  <span className="h1">简历</span>
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
                      <li className="breadcrumb-item active">简历</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-3">姓名</dt>
                      <dd className="col-9 lead">{resume.name}</dd>

                      <hr />

                      <dt className="col-3">EMAIL</dt>
                      <dd className="col-9">{resume.email}</dd>

                      <dt className="col-3">电话</dt>
                      <dd className="col-9">{resume.phone}</dd>

                      <dt className="col-3">性别</dt>
                      <dd className="col-9">{resume.gender}</dd>

                      <dt className="col-3">出生日期</dt>
                      <dd className="col-9">{resume.birthday}</dd>

                      <dt className="col-3">教育情况</dt>
                      <dd className="col-9">
                        <ul className="list-inline">
                          <li className="list-inline-item">{resume.school}</li>
                          <li className="list-inline-item">{resume.major}</li>
                          <li className="list-inline-item">{resume.education}</li>
                          <li className="list-inline-item">
                            {resume.date_begin}~{resume.date_end}
                          </li>
                        </ul>
                      </dd>

                      <dt className="col-3">住址</dt>
                      <dd className="col-9">
                        <ul className="list-inline">
                          <li className="list-inline-item">{resume.address1}</li>
                          <li className="list-inline-item">{resume.address2}</li>
                          <li className="list-inline-item">{resume.address3}</li>
                        </ul>
                      </dd>

                      <dt className="col-3">自我评价</dt>
                      <dd
                        className="col-9"
                        dangerouslySetInnerHTML={{ __html: resume.ziwopingjia }}
                      />

                      <dt className="col-3">期望职位</dt>
                      <dd className="col-9">{resume.qiwangzhiwei}</dd>

                      <dt className="col-3">期望行业</dt>
                      <dd className="col-9">{resume.qiwanghangye}</dd>

                      <dt className="col-3">意向城市</dt>
                      <dd className="col-9">{resume.yixiangchengshi}</dd>
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
