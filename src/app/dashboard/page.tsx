import { getDashboardData } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { Col, Grid } from "@tremor/react";
import { CapitalChart } from "./CapitalChart";
import { IndicatorCard } from "./IndicatorCard";
import { PortfolioChart } from "./PortfolioChart";
import { WalletTable } from "./WalletTable";

export default async function Dashboard() {
  const userId = await getUserId();
  const { capital, balance, capitalDataPoints, ownedCoins } =
    await getDashboardData(userId);

  return (
    <>
      <Grid numItemsSm={2} className="gap-6">
        <IndicatorCard
          title="Capital"
          value={capital.value}
          percentage={capital.percentageChange}
        />
        <IndicatorCard title="Balance" value={balance} />
      </Grid>
      <div className="mt-6">
        <Grid numItemsLg={6} className="mt-6 gap-6">
          <Col numColSpanLg={4}>
            <CapitalChart chartData={capitalDataPoints} />
          </Col>
          <Col numColSpanLg={2}>
            <PortfolioChart chartData={ownedCoins} />
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <WalletTable ownedCoins={ownedCoins} />
      </div>
    </>
  );
}
