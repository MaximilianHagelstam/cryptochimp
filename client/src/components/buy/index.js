import { useEffect } from 'react';
import UserService from '../../services/UserService';

const Buy = () => {
  useEffect(() => {
    (async () => {
      const res = await UserService.buyCoin('BTC', 2);
      console.log(res);
    })();
  }, []);

  return <p>James</p>;
};

export default Buy;
