import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentJobNResumeList({ data_list }) {
  return (
    <table className="table table-dark table-striped">
      <caption>投递的简历</caption>
      <thead>
        <tr>
          <th>简历</th>
          <th>岗位</th>
          <th>日期</th>
          <th>状态</th>
        </tr>
      </thead>

      <tbody>
        {data_list.map((it) => (
          <tr key={it.id}>
            <td>{it.resume_name}</td>
            <td>{it.recruitment_name}</td>
            <td>{it.datime}</td>
            <td>{it.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ComponentJobNResumeList.propTypes = {
  data_list: PropTypes.array,
};

ComponentJobNResumeList.defaultProps = {
  data_list: [],
};
