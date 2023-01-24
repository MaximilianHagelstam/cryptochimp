import type { MarketCoin } from "../types/MarketCoin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  BadgeDelta,
} from "@tremor/react";
import { useTranslation } from "../hooks/useTranslation";
import { formatCurrency } from "../utils/formatCurrency";

type MarketDataTableProps = {
  coins: MarketCoin[];
};

const MarketDataTable = ({ coins }: MarketDataTableProps) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>#</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.wallet.name}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.common.symbol}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.wallet.price}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">1h %</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">24h %</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">7d %</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.market.marketCap}
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {coins.map((coin) => (
          <TableRow key={coin.symbol}>
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

export default MarketDataTable;
