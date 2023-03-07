import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { formatCurrency } from "@/utils/formatCurrency";

type PortfolioChartProps = {
  coins: {
    name: string;
    totalValue: number;
  }[];
};

const PortfolioChart = ({ coins }: PortfolioChartProps) => {
  if (coins.length === 0)
    return (
      <Card hFull={true}>
        <div className="flex h-full flex-col items-center justify-center">
          <Title color="slate">Portfolio is empty</Title>
        </div>
      </Card>
    );

  return (
    <Card hFull={true}>
      <Title>Portfolio</Title>
      <DonutChart
        data={coins}
        category="totalValue"
        dataKey="name"
        valueFormatter={formatCurrency}
        marginTop="mt-6"
      />
      <Legend categories={coins.map((coin) => coin.name)} marginTop="mt-6" />
    </Card>
  );
};

export default PortfolioChart;
