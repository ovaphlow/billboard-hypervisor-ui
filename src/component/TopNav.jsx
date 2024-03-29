import React from 'react';
import PropTypes from 'prop-types';

import useMessageQty from '../useMessageQty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faEnvelope,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function TopNav({ component_option, component_param_name }) {
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });

  return (
    <nav className="navbar navbar-expand navbar-dark mb-3">
      <div className="container-fluid">
        <a href="home.html" className="navbar-brand">
          龙招聘
        </a>

        <div className="collapse navbar-collapse d-flex justify-content-end">
          <ul className="navbar-nav">
            <li
              className={`nav-item ${
                component_option === '首页' ? 'active' : ''
              }`}
            >
              <a href="home.html" className="nav-link">
                <FontAwesomeIcon icon={faHome} fixedWidth size="lg" />
                <span className="sr-only">(current)</span>
              </a>
            </li>

            <li
              className={`nav-item ${
                component_option === '待处理任务' ? 'active' : ''
              }`}
            >
              <a href="current-user.html#/待处理" className="nav-link">
                <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                {message_qty > 0 && (
                  <small>
                    &nbsp;
                    <span className="badge rounded-pill bg-danger">
                      {message_qty}
                    </span>
                  </small>
                )}
              </a>
            </li>

            <li
              className={`nav-item ${
                component_option === '当前用户' ? 'active' : ''
              }`}
            >
              <a href="current-user.html" className="nav-link">
                <FontAwesomeIcon icon={faUserAlt} fixedWidth size="lg" />
                {component_param_name}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

TopNav.propTypes = {
  component_option: PropTypes.string.isRequired,
  component_param_name: PropTypes.string,
};

TopNav.defaultProps = {
  component_param_name: '',
};
