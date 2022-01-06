import { Box, Button, Center, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CoinTable from './CoinTable';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const URL = `${process.env.REACT_APP_API_URL}/api/crypto?limit=${perPage}`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(URL);
      setCoins(data);
      setLoading(false);
    })();
  }, [URL]);

  return (
    <Box p={8}>
      <CoinTable coins={coins} />

      <br />

      <Center>
        <Button
          colorScheme="blue"
          variant="ghost"
          onClick={() => setPerPage(perPage + 5)}
        >
          {loading ? <Spinner size="md" /> : 'Load More'}
        </Button>
      </Center>
    </Box>
  );
};

export default Home;
