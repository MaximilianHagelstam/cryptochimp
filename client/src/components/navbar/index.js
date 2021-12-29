import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import SignInButton from './SignInButton';
import ToggleThemeButton from './ToggleThemeButton';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const currentUser = await UserService.getCurrentUser();

      if (currentUser) {
        setIsAuth(true);
        setUser(currentUser);
      }
    })();
  }, []);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>CryptoChimp</Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <ToggleThemeButton />

            {isAuth ? <UserMenu user={user} /> : <SignInButton />}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
