import { CapitalChart } from "@/components/CapitalChart";
import { IndicatorCard } from "@/components/IndicatorCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { WalletTable } from "@/components/WalletTable";
import { getDashboardData } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { Col, Grid } from "@tremor/react";

export default async function Dashboard() {
  const userId = await getUserId();
  const { development, balance, capital, capitalChartData, ownedCoins } =
    await getDashboardData(userId);

  return (
    <>
      <Grid numColsMd={2} numColsLg={3} className="gap-x-6 gap-y-6">
        <IndicatorCard
          title="Development"
          metric={development.value}
          percentage={development.percentage}
        />
        <IndicatorCard title="Capital" metric={capital} />
        <IndicatorCard title="Balance" metric={balance} />
      </Grid>
      <div className="mt-6">
        <Grid numColsLg={6} className="mt-6 gap-x-6 gap-y-6">
          <Col numColSpanLg={4}>
            <CapitalChart chartData={capitalChartData} />
          </Col>
          <Col numColSpanLg={2}>
            <PortfolioChart coins={ownedCoins} />
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <WalletTable coins={ownedCoins} />
      </div>
    </>
  );
}
