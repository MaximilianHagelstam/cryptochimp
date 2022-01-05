import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const Buy = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await UserService.buyCoin(symbol, quantity);

    setLoading(false);

    toast({
      title: res.message,
      status: res.status,
      isClosable: true
    });

    if (res.status === 'success') {
      navigate('/wallet');
    }
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
                <Input
                  type="text"
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </FormControl>
              <FormControl id="quantity" isRequired pt={4}>
                <FormLabel>Quantity</FormLabel>
                <NumberInput min={1} onChange={(e) => setQuantity(e)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Stack spacing={10} pt={4}>
                {loading ? (
                  <Button isLoading colorScheme="blue" variant="solid" />
                ) : (
                  <Button colorScheme="blue" type="submit">
                    Buy
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

export default Buy;
