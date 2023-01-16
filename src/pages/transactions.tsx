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
import { useTranslation } from "../hooks/useTranslation";
import TransactionsTable from "../components/TransactionsTable";

const LIMIT = 10;

const Transactions: NextPage = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const { data, fetchNextPage } = trpc.transaction.getAll.useInfiniteQuery(
    {
      limit: LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const transactions = data?.pages[page]?.transactions;

  const handleNextPage = () => {
    fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  if (!transactions)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
    );

  if (transactions?.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="gray">{t.transactions.noTransactions}</Title>
        </div>
      </Card>
    );

  const transactionAmount = data?.pages.reduce(
    (acc, page) => acc + page.transactions.length,
    0
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
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>{t.navLinks.transactions}</Title>
        <Badge text={`${transactionAmount}`} color="gray" />
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
      </Flex>

      <TransactionsTable transactions={filteredTransactions} />

      <Footer height="h-16">
        <Text>{`${t.transactions.footer.page} ${page + 1}`}</Text>
        <Flex justifyContent="justify-end" spaceX="space-x-2">
          <Button
            text={t.transactions.footer.previous}
            size="sm"
            variant="secondary"
            icon={ChevronLeftIcon}
            iconPosition="left"
            onClick={handlePreviousPage}
            disabled={page === 0}
          />
          <Button
            text={t.transactions.footer.next}
            variant="secondary"
            size="sm"
            disabled={transactions.length < LIMIT}
            icon={ChevronRightIcon}
            iconPosition="right"
            onClick={handleNextPage}
          />
        </Flex>
      </Footer>
    </Card>
  );
};

export default Transactions;
