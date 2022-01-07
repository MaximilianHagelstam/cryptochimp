import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react';

const UserMenu = ({ user }) => {
  return (
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
        <MenuItem
          onClick={() => {
            window.open('/api/auth/logout', '_self');
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
