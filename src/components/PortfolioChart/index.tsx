import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { useTranslation } from "../../hooks/useTranslation";
import { formatCurrency } from "../../utils/formatCurrency";

type PortfolioChartProps = {
  portfolio: {
    name: string;
    value: number;
  }[];
};

const PortfolioChart = ({ portfolio }: PortfolioChartProps) => {
  const { t } = useTranslation();

  if (portfolio.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="gray">{t.transactions.noTransactions}</Title>
        </div>
      </Card>
    );

  return (
    <Card>
      <Title>{t.dashboard.portfolio}</Title>
      <DonutChart
        data={portfolio}
        category="value"
        dataKey="name"
        valueFormatter={formatCurrency}
        marginTop="mt-6"
      />
      <Legend
        categories={portfolio.map((coin) => coin.name)}
        marginTop="mt-6"
      />
    </Card>
  );
};

export default PortfolioChart;
