"use client";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { formatCurrency } from "@/lib/utils";
import { OwnedCoin } from "@/types";
import { Card, DonutChart, Legend, Title } from "@tremor/react";

export const PortfolioChart = ({ chartData }: { chartData: OwnedCoin[] }) => {
  if (chartData.length === 0)
    return <EmptyPlaceholder className="h-full w-full" />;

  return (
    <Card className="grid h-full gap-6">
      <Title>Portfolio</Title>
      <DonutChart
        data={chartData}
        category="totalValue"
        index="name"
        valueFormatter={formatCurrency}
      />
      <Legend categories={chartData.map((coin) => coin.name)} />
    </Card>
  );
};
