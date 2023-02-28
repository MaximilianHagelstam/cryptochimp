import type { NextPage } from "next";
import Link from "next/link";
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
import { api } from "@/utils/api";
import TransactionsTable from "@/components/TransactionsTable";
import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";

const LIMIT = 10;

const Transactions: NextPage = () => {
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = api.transaction.getAll.useQuery({
    limit: LIMIT,
  });

  if (isLoading)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
    );

  if (isError) return <ErrorPage />;

  const transactions = data.pagedTransactions[page];
  if (!transactions)
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
  const hasMore = !!data.pagedTransactions[page + 1];

  return (
    <Layout title="Transactions">
      <Card>
        <Flex justifyContent="justify-start" spaceX="space-x-2">
          <Title>Transactions</Title>
          <Badge text={`${data.totalTransactions}`} color="slate" />
        </Flex>
        <Flex
          justifyContent="justify-start"
          spaceX="space-x-4"
          marginTop="mt-4"
        >
          <MultiSelectBox
            onValueChange={(value: string[]) => setSelectedSymbols(value)}
            placeholder="Select symbols"
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
            <DropdownItem value="ALL" text="All types" />
            <DropdownItem value="BUY" text="Buy" />
            <DropdownItem value="SELL" text="Sell" />
          </Dropdown>
        </Flex>

        <TransactionsTable transactions={filteredTransactions} />

        <Footer height="h-16">
          <Text>{`Page ${page + 1} of ${data.pagedTransactions.length}`}</Text>
          <Flex justifyContent="justify-end" spaceX="space-x-2">
            <Button
              text="Previous"
              size="sm"
              variant="secondary"
              icon={ChevronLeftIcon}
              iconPosition="left"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
            />
            <Button
              text="Next"
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
    </Layout>
  );
};

export default Transactions;
