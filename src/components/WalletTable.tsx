import type { Coin } from "../types/Coin";
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
import { useTranslation } from "../hooks/useTranslation";
import { formatCurrency } from "../utils/formatCurrency";

type WalletTableProps = {
  coins: Coin[];
};

const WalletTable = ({ coins }: WalletTableProps) => {
  const { t } = useTranslation();

  if (coins.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="slate">{t.wallet.noCoins}</Title>
        </div>
      </Card>
    );

  return (
    <Card hFull={true}>
      <Title>{t.navigation.wallet}</Title>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t.wallet.name}</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              {t.common.symbol}
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              {t.common.quantity}
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              {t.wallet.price}
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">24h %</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              {t.wallet.totalValue}
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
                  deltaType={
                    coin.percentChange24h < 0 ? "decrease" : "increase"
                  }
                  text={`${coin.percentChange24h.toFixed(2)}%`}
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
