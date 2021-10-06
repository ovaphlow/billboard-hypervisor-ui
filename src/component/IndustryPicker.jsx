import React from 'react';
import PropTypes from 'prop-types';

export default function IndustryPicker({ caption, value, onChange }) {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/miscellaneous/setting?option=category&category=行业')
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label">{caption || '行业'}</label>
      <select value={value} className="form-control input-underscore" onChange={onChange}>
        <option value="">不限</option>
        {list.map((it) => (
          <option value={it.name} key={it.id}>
            {it.name}
          </option>
        ))}
      </select>
    </div>
  );
}

IndustryPicker.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
