import { formatCurrency } from "@/lib/utils";
import {
  BadgeDelta,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

interface TopCoinsTableProps {
  coins: {
    rank: number;
    name: string;
    symbol: string;
    price: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    marketCap: number;
  }[];
}

export const TopCoinsTable = ({ coins }: TopCoinsTableProps) => {
  return (
    <Card className="w-full">
      <Title>Top Coins</Title>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell className="text-right">Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Symbol</TableHeaderCell>
            <TableHeaderCell className="text-right">Price</TableHeaderCell>
            <TableHeaderCell className="text-right">1h %</TableHeaderCell>
            <TableHeaderCell className="text-right">24h %</TableHeaderCell>
            <TableHeaderCell className="text-right">7d %</TableHeaderCell>
            <TableHeaderCell className="text-right">Market cap</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.name}>
              <TableCell>{coin.rank}</TableCell>
              <TableCell className="text-right">{coin.name}</TableCell>
              <TableCell className="text-right">{coin.symbol}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.price)}
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={coin.percentChange1h < 0 ? "decrease" : "increase"}
                  size="xs"
                >
                  {`${coin.percentChange1h.toFixed(2)}%`}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={
                    coin.percentChange24h < 0 ? "decrease" : "increase"
                  }
                  size="xs"
                >
                  {`${coin.percentChange24h.toFixed(2)}%`}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={coin.percentChange7d < 0 ? "decrease" : "increase"}
                  size="xs"
                >
                  {`${coin.percentChange7d.toFixed(2)}%`}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.marketCap)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
