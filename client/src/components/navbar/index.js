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
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const Navbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const currentUser = await UserService.getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/james');
      }
    })();
  }, [navigate]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>CryptoChimp</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

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
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
