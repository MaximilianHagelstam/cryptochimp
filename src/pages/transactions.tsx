import type { NextPage } from "next";
import { useState } from "react";
import {
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Badge,
  MultiSelectBox,
  MultiSelectBoxItem,
  Title,
  Footer,
  Button,
  Text,
} from "@tremor/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { trpc } from "../utils/trpc";
import TransactionsTable from "../components/TransactionsTable";
import { useTranslation } from "../hooks/useTranslation";
import ErrorPage from "../components/ErrorPage";

const LIMIT = 10;

const Transactions: NextPage = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, error } = trpc.transaction.getAll.useQuery({
    limit: LIMIT,
  });

  if (isLoading)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
    );

  if (isError)
    return <ErrorPage title={t.error.oops} description={error.message} />;

  const transactions = data.pagedTransactions[page];
  if (!transactions)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="slate">{t.transactions.noTransactions}</Title>
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
  const hasMore = !!data.pagedTransactions[page + 1];

  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>{t.navigation.transactions}</Title>
        <Badge text={`${data.totalTransactions}`} color="slate" />
      </Flex>
      <Flex justifyContent="justify-start" spaceX="space-x-4" marginTop="mt-4">
        <MultiSelectBox
          onValueChange={(value: string[]) => setSelectedSymbols(value)}
          placeholder={t.transactions.selectSymbols}
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
          <DropdownItem value="ALL" text={t.transactions.allTypes} />
          <DropdownItem value="BUY" text={t.common.buy} />
          <DropdownItem value="SELL" text={t.common.sell} />
        </Dropdown>
      </Flex>

      <TransactionsTable transactions={filteredTransactions} />

      <Footer height="h-16">
        <Text>{`${t.transactions.page} ${page + 1} ${t.transactions.of} ${
          data.pagedTransactions.length
        }`}</Text>
        <Flex justifyContent="justify-end" spaceX="space-x-2">
          <Button
            text={t.transactions.previous}
            size="sm"
            variant="secondary"
            icon={ChevronLeftIcon}
            iconPosition="left"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
          />
          <Button
            text={t.transactions.next}
            variant="secondary"
            size="sm"
            disabled={!hasMore}
            icon={ChevronRightIcon}
            iconPosition="right"
            onClick={() => setPage((prev) => prev + 1)}
          />
        </Flex>
      </Footer>
    </Card>
  );
};

export default Transactions;
