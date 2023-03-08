import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  BadgeDelta,
} from "@tremor/react";
import { formatCurrency } from "@/utils/formatCurrency";

type MarketTableProps = {
  coins: {
    name: string;
    symbol: string;
    rank: number;
    price: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    marketCap: number;
  }[];
};

const MarketTable = ({ coins }: MarketTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>#</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Name</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Symbol</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Price</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">1h %</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">24h %</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">7d %</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            Market cap
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {coins.map((coin) => (
          <TableRow key={coin.name}>
            <TableCell>{coin.rank}</TableCell>
            <TableCell textAlignment="text-right">{coin.name}</TableCell>
            <TableCell textAlignment="text-right">{coin.symbol}</TableCell>
            <TableCell textAlignment="text-right">
              {formatCurrency(coin.price)}
            </TableCell>
            <TableCell textAlignment="text-right">
              <BadgeDelta
                deltaType={coin.percentChange1h < 0 ? "decrease" : "increase"}
                text={`${coin.percentChange1h.toFixed(2)}%`}
                size="xs"
              />
            </TableCell>
            <TableCell textAlignment="text-right">
              <BadgeDelta
                deltaType={coin.percentChange24h < 0 ? "decrease" : "increase"}
                text={`${coin.percentChange24h.toFixed(2)}%`}
                size="xs"
              />
            </TableCell>
            <TableCell textAlignment="text-right">
              <BadgeDelta
                deltaType={coin.percentChange7d < 0 ? "decrease" : "increase"}
                text={`${coin.percentChange7d.toFixed(2)}%`}
                size="xs"
              />
            </TableCell>
            <TableCell textAlignment="text-right">
              {formatCurrency(coin.marketCap)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MarketTable;
