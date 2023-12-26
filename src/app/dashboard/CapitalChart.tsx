"use client";

import { formatCurrency } from "@/lib/utils";
import { CapitalDataPoint } from "@prisma/client";
import { AreaChart, Card, Title } from "@tremor/react";

export const CapitalChart = ({
  chartData,
}: {
  chartData: CapitalDataPoint[];
}) => {
  if (chartData.length === 0)
    return (
      <Card>
        <div className="flex h-[388px] flex-col items-center justify-center">
          <Title>Chart data has been yet generated</Title>
        </div>
      </Card>
    );

  return (
    <Card>
      <Title>Capital</Title>
      <AreaChart
        data={chartData}
        categories={["capital"]}
        index="date"
        className="mt-6 h-72"
        colors={["blue"]}
        showLegend={false}
        valueFormatter={formatCurrency}
      />
    </Card>
  );
};
