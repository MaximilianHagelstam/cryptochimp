import { Button } from '@chakra-ui/react';

const SignInButton = () => {
  return (
    <Button
      colorScheme="blue"
      variant="ghost"
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
