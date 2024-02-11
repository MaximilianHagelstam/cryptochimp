"use client";

import { formatCurrency } from "@/lib/utils";
import { CapitalDataPoint } from "@prisma/client";
import {
  AreaChart,
  Card,
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  Flex,
  Title,
} from "@tremor/react";
import { useState } from "react";

export const CapitalChart = ({
  chartData,
}: {
  chartData: CapitalDataPoint[];
}) => {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: chartData[0]?.createdAt || new Date(),
    to: new Date(),
  });

  if (chartData.length === 0)
    return (
      <Card>
        <div className="flex h-[388px] flex-col items-center justify-center">
          <Title>Chart data has not yet been generated</Title>
        </div>
      </Card>
    );

  const today = new Date();

  const filteredChartData = chartData
    .filter((dataPoint) => {
      if (!dateRange.from || !dateRange.to) return true;
      return (
        dataPoint.createdAt >= dateRange.from &&
        dataPoint.createdAt <= dateRange.to
      );
    })
    .map((dataPoint) => ({
      capital: dataPoint.capital,
      date: dataPoint.createdAt.toLocaleDateString("fi-FI"),
    }));

  return (
    <Card>
      <Flex className="space-x-6" justifyContent="between" alignItems="center">
        <Title>Capital</Title>
        <DateRangePicker
          className="mx-auto max-w-sm"
          value={dateRange}
          onValueChange={setDateRange}
        >
          <DateRangePickerItem
            key="day"
            value="day"
            from={new Date(new Date().setDate(today.getDate() - 1))}
            to={today}
          >
            1 day
          </DateRangePickerItem>
          <DateRangePickerItem
            key="week"
            value="week"
            from={new Date(new Date().setDate(today.getDate() - 7))}
            to={today}
          >
            1 week
          </DateRangePickerItem>
          <DateRangePickerItem
            key="month"
            value="month"
            from={new Date(new Date().setMonth(today.getMonth() - 1))}
            to={today}
          >
            1 month
          </DateRangePickerItem>
          <DateRangePickerItem
            key="ytd"
            value="ytd"
            from={new Date(today.getFullYear(), 0, 1)}
            to={today}
          >
            YTD
          </DateRangePickerItem>
          <DateRangePickerItem
            key="year"
            value="year"
            from={new Date(new Date().setFullYear(today.getFullYear() - 1))}
            to={today}
          >
            1 year
          </DateRangePickerItem>
        </DateRangePicker>
      </Flex>
      <AreaChart
        data={filteredChartData}
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
