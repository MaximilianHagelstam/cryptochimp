import Link from "next/link";
import { Card, Title, AreaChart } from "@tremor/react";
import { formatCurrency } from "@/utils/formatCurrency";

type CapitalChartProps = {
  chartData: {
    date: string;
    price: number;
  }[];
};

const CapitalChart = ({ chartData }: CapitalChartProps) => {
  if (chartData.length === 0)
    return (
      <Card>
        <div className="flex h-72 flex-col items-center justify-center">
          <Title color="slate">No capital data</Title>
          <p className="mt-2">
            Invest in your first coin{" "}
            <Link className="text-blue-600 hover:underline" href="/trade">
              here
            </Link>
          </p>
        </div>
      </Card>
    );

  return (
    <Card>
      <Title>Capital</Title>
      <AreaChart
        data={chartData}
        categories={["price"]}
        dataKey="date"
        marginTop="mt-6"
        height="h-72"
        colors={["blue"]}
        showLegend={false}
        valueFormatter={formatCurrency}
      />
    </Card>
  );
};

export default CapitalChart;
