import { Box, Flex, HStack, Stack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import NavLink from './NavLink';
import ToggleThemeButton from './ToggleThemeButton';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const currentUser = await UserService.getCurrentUser();
      console.log(currentUser);
      setUser(currentUser);
    })();
  }, []);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <a href="/">
            <Box>CryptoChimp</Box>
          </a>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/wallet">Wallet</NavLink>
            <NavLink to="/buy">Buy</NavLink>
            <NavLink to="/sell">Sell</NavLink>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <ToggleThemeButton />
            <UserMenu user={user} />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
