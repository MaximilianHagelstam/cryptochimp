"use client";

import { formatCurrency } from "@/lib/utils";
import { DonutChart, Legend } from "@tremor/react";

interface PortfolioBreakdownChartProps {
  coins: {
    name: string;
    totalValue: number;
  }[];
}

export const PortfolioBreakdownChart = ({
  coins,
}: PortfolioBreakdownChartProps) => {
  return (
    <>
      <DonutChart
        data={coins}
        category="totalValue"
        index="name"
        valueFormatter={formatCurrency}
        className="mt-6"
      />
      <Legend categories={coins.map((coin) => coin.name)} className="mt-6" />
    </>
  );
};
