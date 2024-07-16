import { getDashboardData } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { LOGIN_URL } from "@/lib/constants";
import { Col, Grid } from "@tremor/react";
import { redirect } from "next/navigation";
import { CapitalChart } from "./CapitalChart";
import { HoldingsTable } from "./HoldingsTable";
import { IndicatorCard } from "./IndicatorCard";
import { PortfolioChart } from "./PortfolioChart";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(LOGIN_URL);
  }

  const { capital, balance, capitalDataPoints, ownedCoins } =
    await getDashboardData(user.id);

  return (
    <>
      <Grid numItemsSm={2} className="gap-6">
        <IndicatorCard
          title="Portfolio value"
          value={capital.value}
          percentage={capital.percentageChange}
        />
        <IndicatorCard title="Cash balance" value={balance} />
      </Grid>
      <div className="mt-6">
        <Grid numItemsLg={6} className="mt-6 gap-6">
          <Col numColSpanLg={4}>
            <CapitalChart chartData={capitalDataPoints} />
          </Col>
          <Col numColSpanLg={2}>
            <PortfolioChart
              chartData={ownedCoins}
              portfolioValue={capital.value}
            />
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <HoldingsTable ownedCoins={ownedCoins} />
      </div>
    </>
  );
}
