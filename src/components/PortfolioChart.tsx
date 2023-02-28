import type { Coin } from "@/types/Coin";
import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { formatCurrency } from "@/utils/formatCurrency";

type PortfolioChartProps = {
  ownedCoins: Coin[];
};

const PortfolioChart = ({ ownedCoins }: PortfolioChartProps) => {
  if (ownedCoins.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="slate">Portfolio is empty</Title>
        </div>
      </Card>
    );

  return (
    <Card hFull={true}>
      <Title>Portfolio</Title>
      <DonutChart
        data={ownedCoins}
        category="totalValue"
        dataKey="name"
        valueFormatter={formatCurrency}
        marginTop="mt-6"
      />
      <Legend
        categories={ownedCoins.map((coin) => coin.name)}
        marginTop="mt-6"
      />
    </Card>
  );
};

export default PortfolioChart;
