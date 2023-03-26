"use client";

import { formatCurrency } from "@/lib/utils";
import type { Transaction } from "@prisma/client";
import {
  Badge,
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  MultiSelectBox,
  MultiSelectBoxItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import Link from "next/link";
import { useState } from "react";

export const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  if (transactions.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="slate">No transactions</Title>
          <p className="mt-2">
            Invest in your first coin{" "}
            <Link className="text-blue-600 hover:underline" href="/trade">
              here
            </Link>
          </p>
        </div>
      </Card>
    );

  const possibleSymbols: string[] = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        transaction.type === selectedType || selectedType === "ALL"
    )
    .filter(
      (transaction) =>
        selectedSymbols.includes(transaction.symbol) ||
        selectedSymbols.length === 0
    );

  return (
    <Card>
      <Title>Transactions</Title>
      <Flex className="mt-4 justify-start space-x-4">
        <MultiSelectBox
          onValueChange={(value: string[]) => setSelectedSymbols(value)}
          placeholder="Select symbols"
          className="max-w-xs"
        >
          {possibleSymbols.map((symbol) => (
            <MultiSelectBoxItem key={symbol} value={symbol} text={symbol} />
          ))}
        </MultiSelectBox>
        <Dropdown
          className="max-w-min"
          defaultValue="ALL"
          onValueChange={(value) => setSelectedType(value)}
        >
          <DropdownItem value="ALL" text="All types" />
          <DropdownItem value="BUY" text="Buy" />
          <DropdownItem value="SELL" text="Sell" />
        </Dropdown>
      </Flex>
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
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleDateString("fi-FI")}
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
    </Card>
  );
};
