import { CapitalChart } from "@/components/CapitalChart";
import { HoldingsTable } from "@/components/HoldingsTable";
import { IndicatorCard } from "@/components/IndicatorCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { getDashboardData } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { INITIAL_CAPITAL, LOGIN_URL } from "@/lib/constants";
import { Col, Grid } from "@tremor/react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(LOGIN_URL);
  }
  const data = await getDashboardData(user.id);

  return (
    <>
      <Grid numItemsSm={3} className="gap-6">
        <IndicatorCard
          title="Portfolio value"
          value={data.capital.value}
          percentage={data.capital.percentageChange}
          from={INITIAL_CAPITAL}
        />
        <IndicatorCard
          title="Portfolio value 24h"
          value={data.capitalToday.value}
          percentage={data.capitalToday.percentageChange}
        />
        <IndicatorCard title="Cash balance" value={data.balance} />
      </Grid>
      <div className="mt-6">
        <Grid numItemsLg={6} className="mt-6 gap-6">
          <Col numColSpanLg={4}>
            <CapitalChart chartData={data.capitalDataPoints} />
          </Col>
          <Col numColSpanLg={2}>
            <PortfolioChart
              chartData={data.ownedCoins}
              portfolioValue={data.coinCapitalValue}
            />
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <HoldingsTable ownedCoins={data.ownedCoins} />
      </div>
    </>
  );
}
