import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function ComponentEmployerFavoriteList({ user_id }) {
  const [list, setList] = React.useState([]);
  const handleRedirect2Resource = async (event) => {
    const cat = event.target.getAttribute('data-category');
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    if (cat === '简历') {
      location = `biz.html#/resume/${id}?uuid=${uuid}`;
    } else {
      alert('未知类型，解析失败。');
    }
  };

  React.useEffect(() => {
    fetch(`/api/miscellaneous/favorite?option=ref_id-and-tag&id=${user_id}&tag=企业用户`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, [user_id]);

  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th className="text-right">序号</th>
          <th>类别</th>
          <th>时间</th>
          <th className="text-right">内容</th>
        </tr>
      </thead>

      <tbody>
        {list.map((it) => (
          <tr key={it.id}>
            <td className="text-right">{it.id}</td>
            <td>{it.category}</td>
            <td>
              {dayjs(it.dtime).format('YYYY-MM-DD')}
              &nbsp;
              <span className="text-muted">{dayjs(it.datime).format('HH:mm:ss')}</span>
            </td>
            <td className="text-right">
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                data-id={it.ref_id2}
                data-uuid={it.ref_uuid2}
                data-category={it.category}
                onClick={handleRedirect2Resource}
              >
                查看
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ComponentEmployerFavoriteList.propTypes = {
  user_id: PropTypes.string.isRequired,
};
