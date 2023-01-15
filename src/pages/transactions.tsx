import { useState } from "react";
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
  Badge,
  MultiSelectBox,
  MultiSelectBoxItem,
  Title,
} from "@tremor/react";
import { trpc } from "../utils/trpc";
import { formatDate, formatPrice } from "../utils/formatters";
import { useTranslation } from "../hooks/useTranslation";

export default function TableView() {
  const [selectedType, setSelectedType] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const { t } = useTranslation();

  const { data: transactions } = trpc.transaction.getAll.useQuery();

  if (!transactions)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-100" />
    );

  if (transactions?.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="gray">No transactions</Title>
        </div>
      </Card>
    );

  const possibleSymbols: string[] = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>{t.navLinks.transactions}</Title>
        <Badge text={`${transactions?.length}`} color="gray" />
      </Flex>
      <Flex justifyContent="justify-start" spaceX="space-x-4" marginTop="mt-4">
        <MultiSelectBox
          onValueChange={(value: string[]) => setSelectedSymbols(value)}
          placeholder={t.transactions.filters.selectSymbols}
          maxWidth="max-w-xs"
        >
          {possibleSymbols.map((symbol) => (
            <MultiSelectBoxItem key={symbol} value={symbol} text={symbol} />
          ))}
        </MultiSelectBox>

        <Dropdown
          maxWidth="max-w-min"
          defaultValue="ALL"
          onValueChange={(value) => setSelectedType(value)}
        >
          <DropdownItem value="ALL" text={t.transactions.filters.allTypes} />
          <DropdownItem value="BUY" text={t.common.buy} />
          <DropdownItem value="SELL" text={t.common.sell} />
        </Dropdown>

        <Dropdown
          maxWidth="max-w-min"
          defaultValue="newest"
          onValueChange={(value) => setSortBy(value)}
        >
          <DropdownItem value="newest" text={t.transactions.filters.newest} />
          <DropdownItem value="oldest" text={t.transactions.filters.oldest} />
        </Dropdown>
      </Flex>

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
          {transactions
            .sort((a, b) => {
              if (sortBy === "oldest") {
                return a.createdAt.getTime() - b.createdAt.getTime();
              }
              return b.createdAt.getTime() - a.createdAt.getTime();
            })
            .filter(
              (transaction) =>
                transaction.type === selectedType || selectedType === "ALL"
            )
            .filter(
              (transaction) =>
                selectedSymbols.includes(transaction.symbol) ||
                selectedSymbols.length === 0
            )
            .map((transaction) => (
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
    </Card>
  );
}
