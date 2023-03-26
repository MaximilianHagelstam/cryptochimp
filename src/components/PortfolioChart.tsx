"use client";

import { formatCurrency } from "@/lib/utils";
import { Card, DonutChart, Legend, Title } from "@tremor/react";

interface PortfolioChartProps {
  coins: {
    name: string;
    totalValue: number;
  }[];
}

export const PortfolioChart = ({ coins }: PortfolioChartProps) => {
  if (coins.length === 0)
    return (
      <Card className="h-full">
        <div className="flex h-full flex-col items-center justify-center">
          <Title color="slate">Portfolio is empty</Title>
        </div>
      </Card>
    );

  return (
    <Card className="h-full">
      <Title>Portfolio</Title>
      <DonutChart
        data={coins}
        category="totalValue"
        index="name"
        valueFormatter={formatCurrency}
        className="mt-6"
      />
      <Legend categories={coins.map((coin) => coin.name)} className="mt-6" />
    </Card>
  );
};
