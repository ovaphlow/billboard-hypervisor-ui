import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function Feedback() {
  const auth = useAuth();
  const [feedback_list, setFeedbackList] = React.useState([]);
  const [flag, setFlag] = React.useState(0);

  const handleReply = (event) => {
    const content = window.prompt('对用户意见反馈内容的回复');
    fetch(`/api/miscellaneous/feedback/${event.target.getAttribute('data-id')}?option=reply`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        user_id: event.target.getAttribute('data-user-id'),
        category: '系统消息',
        title: '对用户意见反馈内容的回复',
        content,
        datime: moment().format('YYYY-MM-DD'),
        user_category: event.target.getAttribute('data-user-category'),
      }),
    }).then((response) => {
      if (response.status !== 200) console.error('服务器错误');
      else window.location.reload();
    });
  };

  React.useEffect(() => {
    fetch('/api/miscellaneous/feedback/filter')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackList(data);
        setFlag(1);
      });
  }, []);

  React.useEffect(() => {
    if (flag !== 1 || feedback_list.length === 0) return;
    const ll = [];
    feedback_list.map((current) => {
      if (current.user_category === '个人用户') ll.push(current.user_id);
    });
    fetch(`/api/biz/candidate/filter?option=by-id-list&list=${ll.join(',')}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = feedback_list.map((current) => {
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
        setFeedbackList(lf);
      });
  }, [flag, feedback_list]);

  React.useEffect(() => {
    if (flag !== 2 || feedback_list.length === 0) return;
    const ll = [];
    feedback_list.map((current) => {
      if (current.user_category === '企业用户') ll.push(current.user_id);
    });
    fetch(`/api/biz/employer/filter?option=user-by-user-id-list&list=${ll.join(',')}`)
      .then((response) => response.json())
      .then((data) => {
        const lf = feedback_list.map((current) => {
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
        setFeedbackList(lf);
      });
  }, [flag, feedback_list]);

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
                <LeftNav component_option="意见反馈" />
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
                  <span className="h1">意见反馈</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">意见反馈</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-hover">
                      <caption>意见反馈</caption>
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
                        {feedback_list.map((it) => (
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
                              {moment(it.datime).format('YYYY-MM-DD')}
                              <br />
                              <span className="text-muted">
                                {moment(it.datime).format('HH:mm')}
                              </span>
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
