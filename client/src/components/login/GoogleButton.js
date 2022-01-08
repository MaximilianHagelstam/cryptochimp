import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  return (
    <Button
      w={'full'}
      variant={'outline'}
      leftIcon={<FcGoogle />}
      onClick={() => {
        window.open('/api/auth/google', '_self');
      }}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
};

export default GoogleButton;
