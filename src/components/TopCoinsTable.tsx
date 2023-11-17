import { getTopCoins } from "@/lib/api";
import { formatCurrency, getDeltaType } from "@/lib/utils";
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

export const TopCoinsTable = async () => {
  const coins = await getTopCoins(25);

  return (
    <Card className="w-full">
      <Title>Top 25 coins</Title>
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
                  deltaType={getDeltaType(coin.percentChange1h)}
                  size="xs"
                >
                  {`${coin.percentChange1h.toFixed(2)}%`}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange24h)}
                  size="xs"
                >
                  {`${coin.percentChange24h.toFixed(2)}%`}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange7d)}
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
