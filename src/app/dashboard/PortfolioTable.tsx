import { getTransactions } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { getOwnedCoins } from "@/lib/crypto";
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
import Link from "next/link";

export const PortfolioTable = async () => {
  const userId = await getUserId();
  const transactions = await getTransactions(userId);
  const ownedCoins = await getOwnedCoins(transactions);

  if (ownedCoins.length === 0)
    return (
      <Card>
        <div className="flex h-48 flex-col items-center justify-center">
          <Title color="slate">Portfolio is empty</Title>
          <p className="mt-2">
            Invest in your first coin{" "}
            <Link className="text-blue-600 hover:underline" href="/trade">
              here
            </Link>
          </p>
        </div>
      </Card>
    );

  return (
    <Card className="h-full">
      <Title>Portfolio</Title>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Symbol</TableHeaderCell>
            <TableHeaderCell className="text-right">Quantity</TableHeaderCell>
            <TableHeaderCell className="text-right">Price</TableHeaderCell>
            <TableHeaderCell className="text-right">1h %</TableHeaderCell>
            <TableHeaderCell className="text-right">24h %</TableHeaderCell>
            <TableHeaderCell className="text-right">7d %</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Total value
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ownedCoins.map((coin) => (
            <TableRow key={coin.symbol}>
              <TableCell>{coin.name}</TableCell>
              <TableCell className="text-right">{coin.symbol}</TableCell>
              <TableCell className="text-right">
                {coin.quantity.toLocaleString("fi-FI")}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.currentPrice)}
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange1h)}
                  size="xs"
                >{`${coin.percentChange1h.toFixed(2)}%`}</BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange24h)}
                  size="xs"
                >{`${coin.percentChange24h.toFixed(2)}%`}</BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={getDeltaType(coin.percentChange7d)}
                  size="xs"
                >{`${coin.percentChange7d.toFixed(2)}%`}</BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.totalValue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
