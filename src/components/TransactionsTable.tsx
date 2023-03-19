import { formatCurrency } from "@/utils/formatCurrency";
import type { Transaction } from "@prisma/client";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table className="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell className="text-right">Coin</TableHeaderCell>
          <TableHeaderCell className="text-right">Type</TableHeaderCell>
          <TableHeaderCell className="text-right">Quantity</TableHeaderCell>
          <TableHeaderCell className="text-right">Price/coin</TableHeaderCell>
          <TableHeaderCell className="text-right">Total</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {transaction.createdAt.toLocaleDateString("fi-FI")}
            </TableCell>
            <TableCell className="text-right">{transaction.symbol}</TableCell>
            <TableCell className="text-right">
              <Badge
                size="xs"
                color={transaction.type === "BUY" ? "blue" : "pink"}
              >
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {transaction.quantity.toLocaleString("fi-FI")}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(transaction.pricePerCoin)}
            </TableCell>
            <TableCell className="text-right">
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
