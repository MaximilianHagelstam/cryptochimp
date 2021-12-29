import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';
import Logo from './Logo';
import SocialButton from './SocialButton';

const Footer = () => {
  return (
    <div className="footer">
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Logo />
          <Text>© 2022 CryptoChimp. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton
              label={'GitHub'}
              href={'https://github.com/MaximilianHagelstam'}
            >
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={'Twitter'}
              href={'https://twitter.com/MaximilianHag12'}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={'Linkedin'}
              href={
                'https://www.linkedin.com/in/maximilian-hagelstam-704840186/'
              }
            >
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
