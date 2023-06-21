import { Col, Grid } from "@tremor/react";

export default function Loading() {
  return (
    <>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
      </Grid>
      <div className="mt-6">
        <Grid numItemsLg={6} className="mt-6 gap-6">
          <Col numColSpanLg={4}>
            <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
          </Col>
          <Col numColSpanLg={2}>
            <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
          </Col>
        </Grid>
      </div>
      <div className="mt-6">
        <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
      </div>
    </>
  );
}
