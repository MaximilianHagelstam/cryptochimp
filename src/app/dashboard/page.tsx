import { Col, Grid } from "@tremor/react";
import { Suspense } from "react";
import { CapitalCard } from "./CapitalCard";
import { IndicatorCardRow } from "./IndicatorCardRow";
import { PortfolioBreakdown } from "./PortfolioBreakdown";
import { PortfolioTable } from "./PortfolioTable";

export default function Dashboard() {
  return (
    <>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Suspense
          fallback={
            <>
              <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
              <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
              <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            </>
          }
        >
          <IndicatorCardRow />
        </Suspense>
      </Grid>
      <div className="mt-6">
        <Grid numItemsLg={6} className="mt-6 gap-6">
          <Col numColSpanLg={4}>
            <Suspense
              fallback={
                <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
              }
            >
              <CapitalCard />
            </Suspense>
          </Col>
          <Col numColSpanLg={2}>
            <Suspense
              fallback={
                <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
              }
            >
              <PortfolioBreakdown />
            </Suspense>
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <Suspense
          fallback={
            <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
          }
        >
          <PortfolioTable />
        </Suspense>
      </div>
    </>
  );
}
