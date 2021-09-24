import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function useMessageQty({ user_id, user_uuid }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (user_id !== 0 && user_uuid) {
      window.console.info('useMessageQty');
    }

    fetch('/api/biz/employer/statistic?option=to-certificate-qty')
      .then((response) => response.json())
      .then((data) => {
        setQty((prev) => prev + data.qty);
      });
  }, []);

  return qty;
}

useMessageQty.propTypes = {
  user_id: PropTypes.number.isRequired,
  user_uuid: PropTypes.string.isRequred,
};
