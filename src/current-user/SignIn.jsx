import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';

import BottomNav from '../component/BottomNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Home } from '../constant';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('mis-auth');
  }, []);

  const handleSignIn = () => {
    window
      .fetch('/api/mis-user/sign-in', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password: md5(password) }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          window.alert(data.message);
          return;
        }
        sessionStorage.setItem('mis-auth', JSON.stringify(data.content));
        window.location = Home;
      });
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <div className="container-lg">
          <h1>龙招聘 - 平台管理系统</h1>
        </div>
      </header>

      <main className="flex-grow-1">
        <div className="container-lg d-flex h-100 align-items-center justify-content-center">
          <div className="card bg-dark shadow col-6 col-lg-4">
            <div className="card-header">
              <h2>用户登录</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">用户名</label>
                  <input
                    type="text"
                    value={username || ''}
                    autoComplete="username"
                    className="form-control input-underscore"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">密码</label>
                  <input
                    type="password"
                    value={password || ''}
                    autoComplete="current-password"
                    className="form-control input-underscore"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer d-grid">
              <button type="button" className="btn btn-primary" onClick={handleSignIn}>
                <FontAwesomeIcon icon={faSignInAlt} fixedWidth size="lg" />
                确定
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark mt-3">
        <BottomNav />
      </footer>
    </div>
  );
}
