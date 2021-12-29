import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isAuth ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar size={'sm'} src={user.avatar} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar size={'2xl'} src={user.avatar} />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.displayName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.open(
                        `${process.env.REACT_APP_API_URL}/api/auth/logout`,
                        '_self'
                      );
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                  bg: 'pink.300'
                }}
                onClick={() => {
                  window.open(
                    `${process.env.REACT_APP_API_URL}/api/auth/google`,
                    '_self'
                  );
                }}
              >
                Sign In
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
