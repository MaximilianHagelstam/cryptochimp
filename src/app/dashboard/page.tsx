import { getDashboardData } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { Col, Grid } from "@tremor/react";
import { redirect } from "next/navigation";
import { CapitalChart } from "./CapitalChart";
import { IndicatorCard } from "./IndicatorCard";
import { PortfolioChart } from "./PortfolioChart";
import { WalletTable } from "./WalletTable";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/signin");
  }

  const { capital, balance, capitalDataPoints, ownedCoins } =
    await getDashboardData(user.id);

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
