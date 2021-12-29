import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, blue.400, purple.400)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="24px" mt={5} mb={3}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        colorScheme="blue"
        onClick={() => {
          navigate('/');
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
