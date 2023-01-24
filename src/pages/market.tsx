import type { NextPage } from "next";
import { Card } from "@tremor/react";
import { trpc } from "../utils/trpc";
import ErrorPage from "../components/ErrorPage";
import MarketDataTable from "../components/MarketDataTable";

const Market: NextPage = () => {
  const { data, isError, isLoading, error } =
    trpc.market.getMarketData.useQuery({
      start: 1,
      limit: 100,
    });

  if (isLoading)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
    );

  if (isError) return <ErrorPage message={error.message} />;

  return (
    <Card>
      <MarketDataTable coins={data} />
    </Card>
  );
};

export default Market;
