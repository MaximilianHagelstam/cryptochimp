import type { NextPage } from "next";
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
import { api } from "@/utils/api";

const Wallet: NextPage = () => {
  const {
    data: walletData,
    isLoading,
    isError,
  } = api.wallet.getWalletData.useQuery();

  if (isLoading)
    return (
      <>
        <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
          <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
        </ColGrid>
        <Block marginTop="mt-6">
          <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
            <Col numColSpanLg={4}>
              <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
            </Col>
            <Col numColSpanLg={2}>
              <Block spaceY="space-y-6">
                <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
              </Block>
            </Col>
          </ColGrid>
        </Block>
      </>
    );

  if (isError) return <ErrorPage />;

  return (
    <Layout title="Wallet">
      <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        <IndicatorCard
          title="Development"
          metric={walletData.development.value}
          percentage={walletData.development.percentage}
          color={walletData.development.value < 0 ? "red" : "green"}
          icon={
            walletData.development.value < 0
              ? ArrowTrendingDownIcon
              : ArrowTrendingUpIcon
          }
        />
        <IndicatorCard
          title="Capital"
          metric={walletData.capital}
          color="blue"
          icon={BuildingLibraryIcon}
        />
        <IndicatorCard
          title="Balance"
          metric={walletData.balance}
          color="purple"
          icon={BanknotesIcon}
        />
      </ColGrid>
      <Block marginTop="mt-6">
        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          <Col numColSpanLg={4}>
            <WalletTable coins={walletData.ownedCoins} />
          </Col>
          <Col numColSpanLg={2}>
            <PortfolioChart ownedCoins={walletData.ownedCoins} />
          </Col>
        </ColGrid>
      </Block>
    </Layout>
  );
};

export default Wallet;
