import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from 'dayjs';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import { RECOMMEND_CATEGORY } from '../constant';
import {
  useAddressKeys,
  useAddressValues,
  useAddressLevel1ValueList,
} from '../useAddress';
import useAuth from '../useAuth';
import { reducer } from '../miscellaneous';

const initial_notification = {
  category: '',
  title: '',
  date1: '',
  date2: '',
  address_level1: '黑龙江省',
  address_level2: '哈尔滨市',
  publisher: '',
  qty: '',
  baomingfangshi: '',
  content: '',
};

export default function Notification({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [arr1, setArr1] = React.useState([]);
  const [arr2, setArr2] = React.useState([]);
  const address_keys = useAddressKeys();
  const address_values = useAddressValues();
  const address_level1_values = useAddressLevel1ValueList();
  const [notification, dispatch] = React.useReducer(
    reducer,
    initial_notification,
  );

  const handleSave = async () => {
    if (component_option === '新增') {
      fetch('/api/bulletin?option=notification', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(notification),
      }).then((response) => {
        if (response.status === 200) window.history.back();
        else alert('操作失败');
      });
    } else if (component_option === '编辑') {
      const uuid = new URLSearchParams(location.search).get('uuid');
      fetch(`/api/bulletin/${id}?option=notification&uuid=${uuid}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(notification),
      }).then((response) => {
        if (response.status === 200) window.history.back();
        else window.alert('操作失败');
      });
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const uuid = new URLSearchParams(location.search).get('uuid');
    fetch(`/api/bulletin/${id}?option=notification&uuid=${uuid}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) window.history.back();
      else window.alert('操作失败');
    });
  };

  React.useEffect(() => {
    setArr1(address_level1_values);
  }, []);

  React.useEffect(() => {
    const uuid = new URLSearchParams(location.search).get('uuid');
    if (!id || !uuid) return;
    fetch(`/api/bulletin/${id}?option=notification&uuid=${uuid}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'category', value: data.category },
        });
        dispatch({ type: 'set', payload: { key: 'title', value: data.title } });
        dispatch({ type: 'set', payload: { key: 'date1', value: data.date1 } });
        dispatch({ type: 'set', payload: { key: 'date2', value: data.date2 } });
        dispatch({
          type: 'set',
          payload: { key: 'address_level1', value: data.address_level1 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'address_level2', value: data.address_level2 },
        });
        dispatch({
          type: 'set',
          payload: { key: 'publisher', value: data.publisher },
        });
        dispatch({ type: 'set', payload: { key: 'qty', value: data.qty } });
        dispatch({
          type: 'set',
          payload: { key: 'baomingfangshi', value: data.baomignfangshi },
        });
        dispatch({
          type: 'set',
          payload: { key: 'content', value: data.content },
        });
      });
  }, [id, location]);

  React.useEffect(() => {
    const arr = [];
    setArr2(arr);
    for (let i = 0; i < address_values.length; i += 1) {
      if (address_values[i] === notification.address_level1) {
        const code = address_keys[i];
        for (let j = 0; j < address_keys.length; j += 1) {
          if (
            address_keys[j].slice(0, 2) === code.slice(0, 2) &&
            address_keys[j].slice(-2) === '00'
          ) {
            if (address_keys[j].slice(-4) !== '0000')
              arr.push(address_values[j]);
          }
        }
        return;
      }
    }
    setArr2(arr);
  }, [notification.address_level1]);

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
                <LeftNav component_option="推荐信息" />
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
                  <span className="h1">推荐信息</span>
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
                          href="recommend.html"
                          className="text-reset text-decoration-none"
                        >
                          推荐信息
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {component_option}
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">分类</label>
                          <select
                            value={notification.category}
                            className="form-control input-underscore"
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
                            <option value="">未选择</option>
                            {RECOMMEND_CATEGORY.map((it) => (
                              <option
                                key={RECOMMEND_CATEGORY.indexOf(it)}
                                value={it}
                              >
                                {it}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">标题</label>
                          <input
                            type="text"
                            value={notification.title}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'title',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">发布日期</label>
                          <input
                            type="date"
                            value={notification.date1}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date1',
                                  value: event.target.value,
                                },
                              })
                            }
                            onBlur={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date2',
                                  value: dayjs(event.target.value)
                                    .add(15, 'days')
                                    .format('YYYY-MM-DD'),
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">截止日期</label>
                          <input
                            type="date"
                            value={notification.date2}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'date2',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">地址</label>
                          <select
                            value={notification.address_level1}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'address_level1',
                                  value: event.target.value,
                                },
                              })
                            }
                          >
                            <option value="">未选择</option>
                            {arr1.map((it) => (
                              <option key={arr1.indexOf(it)} value={it}>
                                {it}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <select
                            value={notification.address_level2}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'address_level2',
                                  value: event.target.value,
                                },
                              })
                            }
                          >
                            <option value="">未选择</option>
                            {arr2.map((it) => (
                              <option key={arr2.indexOf(it)} value={it}>
                                {it}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">招聘单位</label>
                          <input
                            type="text"
                            value={notification.publisher}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'publisher',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">招聘人数</label>
                          <input
                            type="number"
                            value={notification.qty}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'qty',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">报名方式</label>
                          <input
                            type="text"
                            value={notification.baomingfangshi}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: {
                                  key: 'baomingfangshi',
                                  value: event.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">栏目内容</label>
                      <ReactQuill
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            [{ align: [] }],
                            ['bold', 'italic', 'underline', 'blockquote'],
                            ['image'],
                          ],
                        }}
                        formats={[
                          'header',
                          'align',
                          'bold',
                          'italic',
                          'underline',
                          'blockquote',
                          'image',
                        ]}
                        placeholder="请填写内容"
                        value={notification.content}
                        onChange={(event) =>
                          dispatch({
                            type: 'set',
                            payload: { key: 'content', value: event },
                          })
                        }
                      />
                    </div>
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
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleRemove}
                        >
                          删除
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                      >
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

Notification.propTypes = {
  component_option: PropTypes.string.isRequired,
};
