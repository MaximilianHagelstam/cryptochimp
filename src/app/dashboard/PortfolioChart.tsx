"use client";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import {
  calculateCoinShare,
  formatCurrency,
  formatPercentage,
} from "@/lib/utils";
import { OwnedCoin } from "@/types";
import { ChartPieIcon, QueueListIcon } from "@heroicons/react/24/outline";
import {
  Card,
  DonutChart,
  Flex,
  Legend,
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  Title,
} from "@tremor/react";
import { useState } from "react";

export const PortfolioChart = ({
  chartData,
  portfolioValue,
}: {
  chartData: OwnedCoin[];
  portfolioValue: number;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (chartData.length === 0)
    return <EmptyPlaceholder className="h-full w-full" />;

  return (
    <Card className="h-full">
      <Flex className="space-x-6" justifyContent="between" alignItems="center">
        <Title>Asset allocation</Title>
        <TabGroup
          className="max-w-[164px]"
          index={selectedIndex}
          onIndexChange={setSelectedIndex}
        >
          <TabList variant="solid">
            <Tab icon={ChartPieIcon}>Chart</Tab>
            <Tab icon={QueueListIcon}>List</Tab>
          </TabList>
        </TabGroup>
      </Flex>
      {selectedIndex === 0 ? (
        <div className="mt-6 grid gap-6">
          <DonutChart
            data={chartData}
            category="totalValue"
            index="name"
            valueFormatter={formatCurrency}
          />
          <Legend categories={chartData.map((coin) => coin.name)} />
        </div>
      ) : (
        <>
          <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
            <span>Asset</span>
            <span>Amount / Share</span>
          </p>
          <List className="mt-2">
            {chartData
              .sort((a, b) => b.totalValue - a.totalValue)
              .map((data) => (
                <ListItem key={data.name} className="space-x-6">
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className="truncate dark:text-dark-tremor-content-emphasis">
                      {data.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {formatCurrency(data.totalValue)}
                    </span>
                    <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                      {formatPercentage(
                        calculateCoinShare(data.totalValue, portfolioValue)
                      )}
                    </span>
                  </div>
                </ListItem>
              ))}
          </List>
        </>
      )}
    </Card>
  );
};
