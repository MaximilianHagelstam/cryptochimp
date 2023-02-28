import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card,
  Title,
  BadgeDelta,
} from "@tremor/react";
import { formatCurrency } from "@/utils/formatCurrency";

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
        <div className="flex h-96 flex-col items-center justify-center">
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
    <Card hFull={true}>
      <Title>Wallet</Title>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Symbol</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Quantity
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Price</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">1h %</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">24h %</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">7d %</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Total value
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.symbol}>
              <TableCell>{coin.name}</TableCell>
              <TableCell textAlignment="text-right">{coin.symbol}</TableCell>
              <TableCell textAlignment="text-right">
                {coin.quantity.toLocaleString("fi-FI")}
              </TableCell>
              <TableCell textAlignment="text-right">
                {formatCurrency(coin.currentPrice)}
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
                  deltaType={
                    coin.percentChange24h < 0 ? "decrease" : "increase"
                  }
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
