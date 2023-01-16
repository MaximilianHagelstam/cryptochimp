import type { Transaction } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
} from "@tremor/react";
import { useTranslation } from "../../hooks/useTranslation";
import { formatDate, formatPrice } from "../../utils/formatters";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const { t } = useTranslation();

  return (
    <Table marginTop="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>{t.transactions.table.date}</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.table.coin}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.table.type}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.table.amount}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.table.pricePerCoin}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.table.total}
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.createdAt)}</TableCell>
            <TableCell textAlignment="text-right">
              {transaction.symbol}
            </TableCell>
            <TableCell textAlignment="text-right">
              <Badge
                text={
                  transaction.type === "BUY"
                    ? t.common.buy.toUpperCase()
                    : t.common.sell.toUpperCase()
                }
                size="xs"
                color={transaction.type === "BUY" ? "blue" : "pink"}
              />
            </TableCell>
            <TableCell textAlignment="text-right">
              {transaction.amount}
            </TableCell>
            <TableCell textAlignment="text-right">
              {formatPrice(transaction.pricePerCoin)}
            </TableCell>
            <TableCell textAlignment="text-right">
              {transaction.type === "BUY" ? (
                <span className="text-red-500">
                  {`-${formatPrice(
                    transaction.amount * transaction.pricePerCoin
                  )}`}
                </span>
              ) : (
                <span className="text-green-500">
                  {`+${formatPrice(
                    transaction.amount * transaction.pricePerCoin
                  )}`}
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
