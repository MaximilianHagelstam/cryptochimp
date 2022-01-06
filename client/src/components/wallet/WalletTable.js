import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const WalletTable = ({ coins }) => {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderRadius={'xl'}
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Amount invested</Th>
            <Th isNumeric>Current price</Th>
            <Th isNumeric>Gain</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coins ? (
            coins.map((coin) => (
              <Tr key={coin.symbol}>
                <Td>{coin.symbol}</Td>
                <Td isNumeric>{coin.quantity}</Td>
                <Td isNumeric>
                  $
                  {Math.round((coin.amountInvested + Number.EPSILON) * 100) /
                    100}
                </Td>
                <Td isNumeric>
                  $
                  {Math.round((coin.currentPrice + Number.EPSILON) * 100) / 100}
                </Td>
                <Td
                  isNumeric
                  color={coin.profitPct < 0 ? 'red.400' : 'green.400'}
                >
                  {Math.round((coin.profitPct + Number.EPSILON) * 100) / 100}%
                </Td>
              </Tr>
            ))
          ) : (
            <Tr></Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WalletTable;
