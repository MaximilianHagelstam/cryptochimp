import axios from 'axios';
import { useEffect, useState } from 'react';
import CoinTable from './CoinTable';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(5);

  const URL = `${process.env.REACT_APP_API_URL}/api/crypto/all?limit=${perPage}`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(URL);
      setCoins([...coins, ...data]);
      setLoading(false);
    })();
  }, [URL]);

  return (
    <>
      <CoinTable coins={coins} />
    </>
  );
};

export default Home;
