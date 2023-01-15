import { useState } from "react";
import { Badge, Title } from "@tremor/react";
import {
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { trpc } from "../utils/trpc";
import type { Transaction } from "@prisma/client";
import { formatDate, formatPrice } from "../utils/formatters";

export default function TableView() {
  const [selectedType, setSelectedType] = useState("ALL");

  const isTransactionSelected = (transaction: Transaction): boolean =>
    transaction.type === selectedType || selectedType === "ALL";

  const { data: transactions } = trpc.transaction.getAll.useQuery();

  if (!transactions) return <p>No transactions</p>;

  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>Transactions</Title>
        <Badge text={`${transactions?.length}`} color="gray" />
      </Flex>
      <Dropdown
        maxWidth="max-w-xs"
        defaultValue="ALL"
        onValueChange={(value) => setSelectedType(value)}
        marginTop="mt-2"
      >
        <DropdownItem value="ALL" text="All transaction types" />
        <DropdownItem value="BUY" text="Buy" />
        <DropdownItem value="SELL" text="Sell" />
      </Dropdown>

      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Coin</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Transaction type
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Price/coin (€)
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions
            .filter((transaction) => isTransactionSelected(transaction))
            .map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
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
                  {transaction.amount}
                </TableCell>
                <TableCell textAlignment="text-right">
                  {formatPrice(transaction.pricePerCoin)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
