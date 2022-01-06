import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import Cash from './Cash';
import WalletTable from './WalletTable';

const Wallet = () => {
  const [wallet, setWallet] = useState([{}]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const userWallet = await UserService.getWallet();
      const currentUser = await UserService.getCurrentUser();

      setWallet(userWallet);
      setUser(currentUser);
      setLoading(false);
    })();
  }, []);

  return (
    <Box p={8}>
      <Cash amount={loading ? <Spinner size="md" /> : user.cash} />
      <WalletTable coins={wallet} />
    </Box>
  );
};

export default Wallet;
