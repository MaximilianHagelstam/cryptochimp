import type { NextPage } from "next";
import { Block, Card, Col, ColGrid } from "@tremor/react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import IndicatorCard from "../components/IndicatorCard";
import { useTranslation } from "../hooks/useTranslation";
import { formatCurrency } from "../utils/formatCurrency";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const { t } = useTranslation();

  const { data: indicatorData } = trpc.dashboard.getIndicatorData.useQuery();

  return (
    <>
      <ColGrid
        numColsMd={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-6"
      >
        {indicatorData ? (
          <>
            <IndicatorCard
              title={t.dashboard.development}
              metric={indicatorData.developmentValue}
              percentage={indicatorData.developmentPercentage}
              color={indicatorData.developmentValue < 0 ? "red" : "green"}
              icon={
                indicatorData.developmentValue < 0
                  ? ArrowTrendingDownIcon
                  : ArrowTrendingUpIcon
              }
            />
            <IndicatorCard
              title={t.dashboard.capital}
              metric={indicatorData.capital}
              icon={BuildingLibraryIcon}
              color="blue"
            />
            <IndicatorCard
              title={t.dashboard.balance}
              metric={indicatorData.balance}
              icon={BanknotesIcon}
              color="fuchsia"
            />
          </>
        ) : (
          <>
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
          </>
        )}
      </ColGrid>
      <Block marginTop="mt-6">
        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          <Col numColSpanLg={4}>
            <Card hFull={true}>
              <div className="h-60" />
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Block spaceY="space-y-6">
              <Card>
                <div className="h-96" />
              </Card>
            </Block>
          </Col>
        </ColGrid>
      </Block>
    </>
  );
};

export default Dashboard;
