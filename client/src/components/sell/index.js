import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const Sell = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    (async () => {
      const { wallet } = await UserService.getCurrentUser();
      setWallet(wallet);
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await UserService.sellCoin(symbol);

    setLoading(false);

    toast({
      title: res.message,
      status: res.status,
      isClosable: true
    });

    navigate('/wallet');
  };

  return (
    <Box p={16}>
      <Flex align={'center'} justify={'center'}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={onSubmit}>
              <FormControl id="symbol" isRequired>
                <FormLabel>Symbol</FormLabel>
                <Select
                  placeholder="Coin symbol"
                  onChange={(e) => setSymbol(e.target.value)}
                  width={56}
                >
                  {wallet.map((coin) => (
                    <option key={coin.symbol}>{coin.symbol}</option>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={10} pt={4}>
                {loading ? (
                  <Button isLoading colorScheme="blue" variant="solid" />
                ) : (
                  <Button colorScheme="blue" type="submit">
                    Sell
                  </Button>
                )}
              </Stack>
            </form>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sell;
