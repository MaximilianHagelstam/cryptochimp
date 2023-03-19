import { formatCurrency } from "@/utils/formatCurrency";
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

type WalletTableProps = {
  coins: {
    symbol: string;
    quantity: number;
    currentPrice: number;
    name: string;
    totalValue: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
  }[];
};

const WalletTable = ({ coins }: WalletTableProps) => {
  if (coins.length === 0)
    return (
      <Card>
        <div className="flex h-48 flex-col items-center justify-center">
          <Title color="slate">Wallet is empty</Title>
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
      <Title>Wallet</Title>
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
          {coins.map((coin) => (
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
                  deltaType={coin.percentChange1h < 0 ? "decrease" : "increase"}
                  size="xs"
                >{`${coin.percentChange1h.toFixed(2)}%`}</BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={
                    coin.percentChange24h < 0 ? "decrease" : "increase"
                  }
                  size="xs"
                >{`${coin.percentChange24h.toFixed(2)}%`}</BadgeDelta>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta
                  deltaType={coin.percentChange7d < 0 ? "decrease" : "increase"}
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

export default WalletTable;
