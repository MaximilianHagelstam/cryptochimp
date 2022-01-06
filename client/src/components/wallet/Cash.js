import { Box, Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

const Cash = ({ amount }) => {
  return (
    <Stack>
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: 'center', lg: 'flex-start' }}
        borderRadius={'xl'}
      >
        <Box p={4}>
          <Stat>
            <StatLabel>Cash</StatLabel>
            <StatNumber>
              ${Math.round((amount + Number.EPSILON) * 100) / 100}
            </StatNumber>
          </Stat>
        </Box>
      </Box>
    </Stack>
  );
};

export default Cash;
