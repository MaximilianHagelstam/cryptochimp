import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';

const Wallet = () => {
  const [wallet, setWallet] = useState([{}]);

  useEffect(() => {
    (async () => {
      const res = await UserService.getWallet();
      setWallet(res);
    })();
  }, []);

  return (
    <>
      {wallet.map((coin) => (
        <h1 key={coin._id}>{JSON.stringify(coin)}</h1>
      ))}
    </>
  );
};

export default Wallet;
