import type { NextPage } from "next";
import { useState } from "react";
import { Button, Card, Flex, Footer } from "@tremor/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { trpc } from "../utils/trpc";
import { useTranslation } from "../hooks/useTranslation";
import ErrorPage from "../components/ErrorPage";
import MarketDataTable from "../components/MarketDataTable";

const LIMIT = 100;

const Market: NextPage = () => {
  const { t } = useTranslation();
  const [start, setStart] = useState(1);
  const { data, isError, isLoading, error } =
    trpc.market.getMarketData.useQuery({
      start,
      limit: LIMIT,
    });

  if (isLoading)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
    );

  if (isError) return <ErrorPage message={error.message} />;

  return (
    <Card>
      <MarketDataTable coins={data} />

      <Footer height="h-16">
        <Flex justifyContent="justify-end" spaceX="space-x-2">
          <Button
            text={t.transactions.previous}
            size="sm"
            variant="secondary"
            icon={ChevronLeftIcon}
            iconPosition="left"
            onClick={() => setStart((prev) => prev - LIMIT)}
            disabled={start === 1}
          />
          <Button
            text={t.transactions.next}
            variant="secondary"
            size="sm"
            disabled={data.length < LIMIT}
            icon={ChevronRightIcon}
            iconPosition="right"
            onClick={() => setStart((prev) => prev + LIMIT)}
          />
        </Flex>
      </Footer>
    </Card>
  );
};

export default Market;
