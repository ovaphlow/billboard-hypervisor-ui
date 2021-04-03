import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import { BANNER_CATEGORY } from '../constant';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_banner = {
  status: '未启用',
  category: '',
  title: '',
  comment: '',
  data_url: '',
};

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = React.useState('');
  const [banner, dispatch] = React.useReducer(reducer, initial_banner);

  const convertImg2Data = (event) => {
    if (!event.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch({ type: 'set', payload: { key: 'data_url', value: e.target.result } });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    fetch(`/api/bulletin/banner/${id}?uuid=${uuid}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) window.history.back();
      else window.alert('操作失败');
    });
  };

  const handleSubmit = async () => {
    if (!banner.title || !banner.comment || !banner.data_url) {
      window.alert('请完整填写所需信息');
      return;
    }

    if (component_option === '新增') {
      fetch('/api/bulletin/banner', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...banner,
          datime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }),
      }).then((response) => {
        if (response.status === 200) window.history.back();
        else window.alert('操作失败');
      });
    } else if (component_option === '编辑') {
      fetch(`/api/bulletin/banner/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...banner,
          datime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }),
      }).then((response) => {
        if (response.status === 200) window.history.back();
        else window.alert('操作失败');
      });
    }
  };

  React.useEffect(() => {
    if (component_option === '编辑') {
      setUUID(new URLSearchParams(location.search).get('uuid'));
    }
  }, [location]);

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/bulletin/banner/${id}?uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'set', payload: { key: 'status', value: data.status } });
        dispatch({ type: 'set', payload: { key: 'category', value: data.category } });
        dispatch({ type: 'set', payload: { key: 'title', value: data.title } });
        dispatch({ type: 'set', payload: { key: 'comment', value: data.comment } });
        dispatch({ type: 'set', payload: { key: 'data_url', value: data.data_url } });
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
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="banner.html" className="text-reset text-decoration-none">
                          BANNER
                        </a>
                      </li>
                      <li className="breadcrumb-item active">{component_option}</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="form-file">
                      <input
                        type="file"
                        className="form-file-input input-underscore"
                        id="file"
                        onChange={convertImg2Data}
                      />
                      <label className="form-file-label" htmlFor="file">
                        <span className="form-file-text">选择文件</span>
                        <span className="form-file-button">浏览</span>
                      </label>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">标题</label>
                      <input
                        type="text"
                        value={banner.title}
                        className="form-control input-underscore"
                        onChange={(event) =>
                          dispatch({
                            type: 'set',
                            payload: { key: 'title', value: event.target.value },
                          })
                        }
                      />
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
                        value={banner.comment}
                        onChange={(event) =>
                          dispatch({ type: 'set', payload: { key: 'comment', value: event } })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">类别</label>
                      <select
                        value={banner.category}
                        className="form-control input-underscore"
                        onChange={(event) =>
                          dispatch({
                            type: 'set',
                            payload: { key: 'category', value: event.target.value },
                          })
                        }
                      >
                        <option value="">未选择</option>
                        {BANNER_CATEGORY.map((it) => (
                          <option key={BANNER_CATEGORY.indexOf(it)} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">状态</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="status"
                          checked={banner.status === '启用'}
                          onChange={(event) =>
                            dispatch({
                              type: 'set',
                              payload: {
                                key: 'status',
                                value: event.target.checked ? '启用' : '未启用',
                              },
                            })
                          }
                        />
                        <label htmlFor="status" className="form-check-label">
                          启用
                        </label>
                      </div>
                    </div>

                    <hr />

                    <p className="text-muted text-center">
                      预览
                      <br />
                      <img src={banner.data_url} alt={banner.title} className="img-fluid" />
                    </p>
                  </div>

                  <div className="card-footer d-flex justify-content-between">
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

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
