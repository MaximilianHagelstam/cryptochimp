import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { Block, Col, ColGrid } from "@tremor/react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import ErrorPage from "@/components/ErrorPage";
import IndicatorCard from "@/components/IndicatorCard";
import PortfolioChart from "@/components/PortfolioChart";
import WalletTable from "@/components/WalletTable";
import Layout from "@/components/Layout";
import CapitalChart from "@/components/CapitalChart";
import { api } from "@/utils/api";

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
      <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
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
      </ColGrid>
      <Block marginTop="mt-6">
        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
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
        </ColGrid>
      </Block>
      <Block marginTop="mt-6">
        {isLoading ? (
          <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
        ) : (
          <WalletTable coins={dashboardData.ownedCoins} />
        )}
      </Block>
    </Layout>
  );
};

export default Dashboard;
