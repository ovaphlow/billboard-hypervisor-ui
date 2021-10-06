import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from 'dayjs';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_topic = {
  title: '',
  content: '',
  tag: '',
  date: dayjs().format('YYYY-MM-DD'),
  time: dayjs().format('HH:mm:ss'),
};

export default function Topic({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [topic, dispatch] = React.useReducer(reducer, initial_topic);
  const [uuid, setUUID] = React.useState('');

  const handleSubmit = async () => {
    if (component_option === '新增') {
      fetch('/api/bulletin?option=topic', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(topic),
      }).then((response) => {
        if (response.status === 200) window.history.back();
        else window.alert('操作失败');
      });
    } else if (component_option === '编辑') {
      fetch(`/api/bulletin/${id}?option=topic&uuid=${uuid}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(topic),
      }).then((response) => {
        if (response.status === 200) history.back();
        else alert('操作失败');
      });
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    fetch(`/api/bulletin/${id}?option=topic&uuid=${uuid}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) window.history.back();
      else window.alert('操作失败');
    });
  };

  React.useEffect(() => {
    if (component_option === '编辑') {
      setUUID(new URLSearchParams(location.search).get('uuid'));
    }
  }, [location]);

  React.useEffect(() => {
    if (!uuid) return;
    fetch(`/api/bulletin/${id}?option=topic&uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'set', payload: { key: 'title', value: data.title } });
        dispatch({ type: 'set', payload: { key: 'content', value: data.content } });
        dispatch({ type: 'set', payload: { key: 'tag', value: data.tag } });
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
                <LeftNav component_option="热门话题" />
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
                  <span className="h1">热门话题</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="topic.html" className="text-reset text-decoration-none">
                          热门话题
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">TAG</label>
                          <select
                            value={topic.tag || ''}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: { key: 'tag', value: event.target.value },
                              })
                            }
                          >
                            <option value="">未选择</option>
                            <option value="热门话题">小程序首页</option>
                            <option value="职业发展">职业发展</option>
                            <option value="面试问题">面试问题</option>
                            <option value="职业规划">职业规划</option>
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">标题</label>
                          <input
                            type="text"
                            value={topic.title}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: { key: 'title', value: event.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">内容</label>
                      <ReactQuill
                        formats={[
                          'header',
                          'align',
                          'bold',
                          'italic',
                          'underline',
                          'blockquote',
                          'link',
                          'image',
                        ]}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            [{ align: [] }],
                            ['bold', 'italic', 'underline', 'blockquote'],
                            ['link', 'image'],
                          ],
                        }}
                        placeholder="请填写内容"
                        value={topic.content}
                        onChange={(event) =>
                          dispatch({ type: 'set', payload: { key: 'content', value: event } })
                        }
                      />
                    </div>
                  </div>

                  <div className="card-footer d-flex justify-content-between">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => window.history.back()}
                      >
                        返回
                      </button>
                    </div>

                    <div className="btn-group">
                      {component_option === '编辑' && (
                        <button type="button" className="btn btn-danger" onClick={handleRemove}>
                          删除
                        </button>
                      )}

                      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        保存
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

Topic.propTypes = {
  component_option: PropTypes.string.isRequired,
};
