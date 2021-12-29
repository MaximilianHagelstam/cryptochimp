import { Link, useColorModeValue } from '@chakra-ui/react';

const NavLink = ({ children, to }) => {
  return (
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
};

export default NavLink;
