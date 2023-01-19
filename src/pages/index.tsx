import type { NextPage } from "next";
import { Block, Col, ColGrid } from "@tremor/react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import ErrorPage from "../components/ErrorPage";
import IndicatorCard from "../components/IndicatorCard";
import PortfolioChart from "../components/PortfolioChart";
import WalletTable from "../components/WalletTable";
import { trpc } from "../utils/trpc";
import { useTranslation } from "../hooks/useTranslation";

const Wallet: NextPage = () => {
  const { t } = useTranslation();

  const {
    data: walletData,
    isLoading,
    isError,
    error,
  } = trpc.wallet.getWalletData.useQuery();

  if (isLoading)
    return (
      <>
        <ColGrid
          numColsMd={2}
          numColsLg={3}
          gapX="gap-x-6"
          gapY="gap-y-6"
          marginTop="mt-6"
        >
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

  if (isError)
    return <ErrorPage title={t.error.oops} description={error.message} />;

  return (
    <>
      <ColGrid
        numColsMd={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-6"
      >
        <IndicatorCard
          title={t.wallet.development}
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
          title={t.wallet.capital}
          metric={walletData.capital}
          color="blue"
          icon={BuildingLibraryIcon}
        />
        <IndicatorCard
          title={t.wallet.balance}
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
            <Block spaceY="space-y-6">
              <PortfolioChart ownedCoins={walletData.ownedCoins} />
            </Block>
          </Col>
        </ColGrid>
      </Block>
    </>
  );
};

export default Wallet;
