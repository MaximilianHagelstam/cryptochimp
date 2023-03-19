import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";
import TransactionsTable from "@/components/TransactionsTable";
import { api } from "@/utils/api";
import {
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  MultiSelectBox,
  MultiSelectBoxItem,
  Title,
} from "@tremor/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Transactions: NextPage = () => {
  const { data: session, status } = useSession();
  if (!session?.user && status !== "loading") {
    signIn();
  }

  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const { data, isLoading, isError } = api.transaction.getAll.useQuery();

  if (isError) return <ErrorPage />;

  const transactions = data || [];

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
    <Layout title="Transactions">
      {isLoading ? (
        <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
      ) : transactions.length === 0 ? (
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
      ) : (
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
          <TransactionsTable transactions={filteredTransactions} />
        </Card>
      )}
    </Layout>
  );
};

export default Transactions;
