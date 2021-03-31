import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function ComplaintList() {
  const auth = useAuth();
  const [complaint_list, setComplaintList] = React.useState([]);
  const [flag, setFlag] = React.useState(0);

  const handleReply = (event) => {
    const content = window.prompt('对投诉回复的内容');
    fetch(`/api/miscellaneous/feedback/${event.target.getAttribute('data-id')}?option=reply`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        user_id: event.target.getAttribute('data-user-id'),
        category: '系统消息',
        title: '对用户投诉内容的回复',
        content,
        datime: dayjs().format('YYYY-MM-DD'),
        user_category: event.target.getAttribute('data-user-category'),
      }),
    }).then((response) => {
      if (response.status !== 200) console.error('服务器错误');
      else window.location.reload();
    });
  };

  React.useEffect(() => {
    fetch('/api/miscellaneous/feedback/filter?category=投诉')
      .then((response) => response.json())
      .then((data) => {
        setComplaintList(data);
        setFlag(1);
      });
  }, []);

  React.useEffect(() => {
    if (flag !== 1 || complaint_list.length === 0) return;
    const ll = [];
    complaint_list.map((current) => {
      if (current.user_category === '个人用户') ll.push(current.user_id);
    });
    fetch(`/api/biz/candidate/filter?option=by-id-list&list=${ll.join(',')}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = complaint_list.map((current) => {
          if (current.user_category === '个人用户') {
            const user = data.find((element) => element.uuid === current.user_uuid);
            return {
              ...current,
              name: (user && user.name) || '',
              phone: (user && user.phone) || '',
              email: (user && user.email) || '',
            };
          } else return current;
        });
        setFlag(2);
        setComplaintList(lf);
      });
  }, [flag, complaint_list]);

  React.useEffect(() => {
    if (flag !== 2 || complaint_list.length === 0) return;
    const ll = [];
    complaint_list.map((current) => {
      if (current.user_category === '企业用户') ll.push(current.user_id);
    });
    fetch(`/api/biz/employer/filter?option=user-by-user-id-list&list=${ll.join(',')}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = complaint_list.map((current) => {
          if (current.user_category === '企业用户') {
            const user = data.find((element) => element.id === current.user_id);
            return {
              ...current,
              name: (user && user.name) || '',
              phone: (user && user.phone) || '',
              email: (user && user.email) || '',
            };
          } else return current;
        });
        setFlag(0);
        setComplaintList(lf);
      });
  }, [flag, complaint_list]);

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
                <LeftNav component_option="投诉" />
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
                  <span className="h1">投诉</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">投诉</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>投诉</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>状态</th>
                          <th>用户</th>
                          <th>时间</th>
                          <th>内容</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>

                      <tbody>
                        {complaint_list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>
                              {it.status === '已处理' ? (
                                <span className="badge bg-secondary">已处理</span>
                              ) : (
                                <span className="badge bg-danger">未处理</span>
                              )}
                            </td>
                            <td>
                              {it.user_category === '企业用户' && (
                                <span className="badge bg-success">{it.user_category}</span>
                              )}
                              {it.user_category === '个人用户' && (
                                <span className="badge bg-info">{it.user_category}</span>
                              )}
                              &nbsp;
                              {it.name}
                              <br />
                              <small className="text-muted">{it.phone}</small>
                            </td>
                            <td>
                              {dayjs(it.datime).format('YYYY-MM-DD')}
                              <br />
                              <small className="text-muted">
                                {dayjs(it.datime).format('HH:mm')}
                              </small>
                            </td>
                            <td>{it.content}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-success btn-sm"
                                data-id={it.id}
                                data-user-id={it.user_id}
                                data-user-category={it.user_category}
                                onClick={handleReply}
                              >
                                <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                                回复
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
