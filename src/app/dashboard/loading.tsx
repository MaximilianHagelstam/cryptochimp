import { Col, Grid } from "@tremor/react";

export default function Loading() {
  return (
    <>
      <Grid numColsMd={2} numColsLg={3} className="gap-x-6 gap-y-6">
        <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
      </Grid>
      <div className="mt-6">
        <Grid numColsLg={6} className="mt-6 gap-x-6 gap-y-6">
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
