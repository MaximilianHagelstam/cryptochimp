import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const CoinTable = ({ coins }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th isNumeric>Price</Th>
          <Th isNumeric>Market cap</Th>
          <Th isNumeric>1d change</Th>
        </Tr>
      </Thead>
      <Tbody>
        {coins.map((coin) => {
          return (
            <Tr key={coin.id}>
              <Td>{coin.cmc_rank}</Td>
              <Td>{coin.name}</Td>
              <Td>{coin.symbol}</Td>
              <Td isNumeric>${Number(coin.quote.USD.price).toFixed(2)}</Td>
              <Td isNumeric>${Number(coin.quote.USD.market_cap)}</Td>
              <Td
                isNumeric
                color={
                  Number(coin.quote.USD.percent_change_24h) < 0
                    ? 'red.400'
                    : 'green.400'
                }
              >
                {Number(coin.quote.USD.percent_change_24h).toFixed(2)}%
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default CoinTable;
