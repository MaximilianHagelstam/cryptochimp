import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(5);

  const URL = `${process.env.REACT_APP_API_URL}/api/crypto/all?limit=${perPage}`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(URL);
      // setCoins([...coins, ...res]);
      setLoading(false);

      console.log(res.data);
    })();
  }, [URL]);

  return (
    <>
      <p>James</p>
    </>
  );
};

export default Home;
