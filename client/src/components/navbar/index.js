import {
  Box,
  Flex,
  HStack,
  Link,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import SignInButton from './SignInButton';
import ToggleThemeButton from './ToggleThemeButton';
import UserMenu from './UserMenu';

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700')
    }}
    href={to}
  >
    {children}
  </Link>
);

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
        <HStack spacing={8} alignItems={'center'}>
          <Box>CryptoChimp</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/wallet">Wallet</NavLink>
            <NavLink to="/buy">Buy</NavLink>
            <NavLink to="/sell">Sell</NavLink>
          </HStack>
        </HStack>

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
