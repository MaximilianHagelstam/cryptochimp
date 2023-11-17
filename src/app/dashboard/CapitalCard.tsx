import { getCapitalChartData } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { Card, Title } from "@tremor/react";
import { CapitalCardChart } from "./CapitalCardChart";

export const CapitalCard = async () => {
  const userId = await getUserId();
  const chartData = await getCapitalChartData(userId);

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
      <CapitalCardChart chartData={chartData} />
    </Card>
  );
};
