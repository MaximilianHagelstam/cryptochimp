import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';

const Wallet = () => {
  const [wallet, setWallet] = useState([{}]);

  useEffect(() => {
    (async () => {
      const res = await UserService.getWallet();
      console.log(res[0]._id);
      setWallet(res);
    })();
  }, []);

  return (
    <>
      {wallet.map((coin) => (
        <h1 key={coin._id}>{coin.symbol}</h1>
      ))}
    </>
  );
};

export default Wallet;
