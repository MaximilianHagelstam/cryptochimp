import type { NextPage } from "next";
import { useState } from "react";
import { Button, Card, Flex, Footer } from "@tremor/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { api } from "@/utils/api";
import ErrorPage from "@/components/ErrorPage";
import MarketTable from "@/components/MarketTable";
import Layout from "@/components/Layout";

const LIMIT = 100;

const Market: NextPage = () => {
  const [start, setStart] = useState(1);
  const {
    data: coins,
    isError,
    isLoading,
  } = api.market.getAllCoins.useQuery({
    start,
    limit: LIMIT,
  });

  if (isError) return <ErrorPage />;

  return (
    <Layout title="Market">
      {isLoading ? (
        <div className="flex h-screen w-full animate-pulse rounded-lg bg-slate-200" />
      ) : (
        <Card>
          <MarketTable coins={coins} />
          <Footer height="h-16">
            <Flex justifyContent="justify-end" spaceX="space-x-2">
              <Button
                text="Previous"
                size="sm"
                variant="secondary"
                icon={ChevronLeftIcon}
                iconPosition="left"
                onClick={() => setStart((prev) => prev - LIMIT)}
                disabled={start === 1}
              />
              <Button
                text="Next"
                variant="secondary"
                size="sm"
                disabled={coins.length < LIMIT}
                icon={ChevronRightIcon}
                iconPosition="right"
                onClick={() => setStart((prev) => prev + LIMIT)}
              />
            </Flex>
          </Footer>
        </Card>
      )}
    </Layout>
  );
};

export default Market;
