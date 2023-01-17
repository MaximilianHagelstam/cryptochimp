import type { NextPage } from "next";
import { Block, Card, Col, ColGrid } from "@tremor/react";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import IndicatorCard from "../components/IndicatorCard";
import { useTranslation } from "../hooks/useTranslation";
import { formatCurrency } from "../utils/formatters";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const { t } = useTranslation();

  const { data, isLoading } = trpc.dashboard.getIndicatorData.useQuery();

  if (!data) return null;

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
          title={t.dashboard.development}
          metric="+14 %"
          icon={ArrowTrendingUpIcon}
          color="green"
        />
        <IndicatorCard
          title={t.dashboard.capital}
          metric={formatCurrency(10000)}
          icon={BuildingLibraryIcon}
          color="blue"
        />
        <IndicatorCard
          title={t.dashboard.balance}
          metric={formatCurrency(data.balance)}
          icon={BanknotesIcon}
          color="fuchsia"
          isLoading={isLoading}
        />
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
