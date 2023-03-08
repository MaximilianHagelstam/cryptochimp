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
import { formatCurrency } from "@/utils/formatCurrency";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table marginTop="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Coin</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Type</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Quantity</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            Price/coin
          </TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">Total</TableHeaderCell>
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
                text={transaction.type}
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
