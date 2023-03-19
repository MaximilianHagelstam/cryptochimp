import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";
import MarketTable from "@/components/MarketTable";
import { api } from "@/utils/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button, Card, Flex } from "@tremor/react";
import type { NextPage } from "next";
import { useState } from "react";

const LIMIT = 50;

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
          <div className="mt-6 h-16 border-t border-slate-200 pt-6">
            <Flex className="justify-end space-x-2">
              <Button
                size="sm"
                variant="secondary"
                icon={ChevronLeftIcon}
                iconPosition="left"
                onClick={() => setStart((prev) => prev - LIMIT)}
                disabled={start === 1}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={coins.length < LIMIT}
                icon={ChevronRightIcon}
                iconPosition="right"
                onClick={() => setStart((prev) => prev + LIMIT)}
              >
                Next
              </Button>
            </Flex>
          </div>
        </Card>
      )}
    </Layout>
  );
};

export default Market;
