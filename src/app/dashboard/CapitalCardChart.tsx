"use client";

import { formatCurrency } from "@/lib/utils";
import { AreaChart } from "@tremor/react";

interface CapitalCardChartProps {
  chartData: {
    date: string;
    capital: number;
  }[];
}

export const CapitalCardChart = ({ chartData }: CapitalCardChartProps) => {
  return (
    <AreaChart
      data={chartData}
      categories={["capital"]}
      index="date"
      className="mt-6 h-72"
      colors={["blue"]}
      showLegend={false}
      valueFormatter={formatCurrency}
    />
  );
};
