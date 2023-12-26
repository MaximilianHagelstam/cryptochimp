import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { getTransactions } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

export const TransactionsTable = async () => {
  const userId = await getUserId();
  const transactions = await getTransactions(userId);

  if (transactions.length === 0) return <EmptyPlaceholder className="h-96" />;

  return (
    <Card>
      <Title>Transactions</Title>
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
                <span
                  className={
                    transaction.type === "BUY"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {`${transaction.type === "BUY" ? "-" : "+"}${formatCurrency(
                    transaction.quantity * transaction.pricePerCoin
                  )}`}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
