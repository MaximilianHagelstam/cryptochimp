"use client";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { formatCurrency } from "@/lib/utils";
import { OwnedCoin } from "@/types";
import { ChartPieIcon, QueueListIcon } from "@heroicons/react/24/outline";
import {
  Bold,
  Card,
  DonutChart,
  Flex,
  Legend,
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  Text,
  Title,
} from "@tremor/react";
import { useState } from "react";

export const PortfolioChart = ({ chartData }: { chartData: OwnedCoin[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (chartData.length === 0)
    return <EmptyPlaceholder className="h-full w-full" />;

  return (
    <Card className="h-full">
      <Flex className="space-x-6" justifyContent="between" alignItems="center">
        <Title>Portfolio</Title>
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
          <Flex className="mt-6" justifyContent="between">
            <Bold>Coins</Bold>
            <Text>Total value</Text>
          </Flex>
          <List className="mt-4">
            {chartData
              .sort((a, b) => b.totalValue - a.totalValue)
              .map((data) => (
                <ListItem key={data.name}>
                  <Text>{data.name}</Text>
                  <Text>{formatCurrency(data.totalValue)}</Text>
                </ListItem>
              ))}
          </List>
        </>
      )}
    </Card>
  );
};
