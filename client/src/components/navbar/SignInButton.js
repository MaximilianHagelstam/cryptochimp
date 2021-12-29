import { Button } from '@chakra-ui/react';

const SignInButton = () => {
  return (
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
  );
};

export default SignInButton;
