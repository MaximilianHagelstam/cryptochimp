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
import { useTranslation } from "../hooks/useTranslation";
import { formatCurrency } from "../utils/formatCurrency";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const { t } = useTranslation();

  return (
    <Table marginTop="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>{t.transactions.date}</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.common.coin}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.common.type}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.common.quantity}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.pricePerCoin}
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            {t.transactions.total}
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {transaction.createdAt.toLocaleDateString("fi-FI")}
            </TableCell>
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
              {transaction.quantity.toLocaleString("fi-FI")}
            </TableCell>
            <TableCell textAlignment="text-right">
              {formatCurrency(transaction.pricePerCoin)}
            </TableCell>
            <TableCell textAlignment="text-right">
              {transaction.type === "BUY" ? (
                <span className="text-red-500">
                  {`-${formatCurrency(
                    transaction.quantity * transaction.pricePerCoin
                  )}`}
                </span>
              ) : (
                <span className="text-green-500">
                  {`+${formatCurrency(
                    transaction.quantity * transaction.pricePerCoin
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
