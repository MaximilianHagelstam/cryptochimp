import { formatCurrency } from "@/utils/formatCurrency";
import { AreaChart, Card, Title } from "@tremor/react";

type CapitalChartProps = {
  chartData: {
    date: string;
    capital: number;
  }[];
};

const CapitalChart = ({ chartData }: CapitalChartProps) => {
  if (chartData.length === 0)
    return (
      <Card>
        <div className="flex h-72 flex-col items-center justify-center">
          <Title color="slate">No capital data yet</Title>
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

export default CapitalChart;
