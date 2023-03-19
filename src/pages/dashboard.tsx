import CapitalChart from "@/components/CapitalChart";
import ErrorPage from "@/components/ErrorPage";
import IndicatorCard from "@/components/IndicatorCard";
import Layout from "@/components/Layout";
import PortfolioChart from "@/components/PortfolioChart";
import WalletTable from "@/components/WalletTable";
import { api } from "@/utils/api";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Col, Grid } from "@tremor/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  if (!session?.user && status !== "loading") {
    signIn();
  }

  const {
    data: dashboardData,
    isLoading,
    isError,
  } = api.dashboard.getDashboardData.useQuery();

  if (isError) return <ErrorPage />;

  return (
    <Layout title="Dashboard">
      <Grid numColsMd={2} numColsLg={3} className="gap-x-6 gap-y-6">
        {isLoading ? (
          <>
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
          </>
        ) : (
          <>
            <IndicatorCard
              title="Development"
              metric={dashboardData.development.value}
              percentage={dashboardData.development.percentage}
              color={dashboardData.development.value < 0 ? "red" : "green"}
              icon={
                dashboardData.development.value < 0
                  ? ArrowTrendingDownIcon
                  : ArrowTrendingUpIcon
              }
            />
            <IndicatorCard
              title="Capital"
              metric={dashboardData.capital}
              color="blue"
              icon={BuildingLibraryIcon}
            />
            <IndicatorCard
              title="Balance"
              metric={dashboardData.balance}
              color="purple"
              icon={BanknotesIcon}
            />
          </>
        )}
      </Grid>
      <div className="mt-6">
        <Grid numColsLg={6} className="mt-6 gap-x-6 gap-y-6">
          <Col numColSpanLg={4}>
            {isLoading ? (
              <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
            ) : (
              <CapitalChart chartData={dashboardData.capitalChartData} />
            )}
          </Col>
          <Col numColSpanLg={2}>
            {isLoading ? (
              <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
            ) : (
              <PortfolioChart coins={dashboardData.ownedCoins} />
            )}
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
        ) : (
          <WalletTable coins={dashboardData.ownedCoins} />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
