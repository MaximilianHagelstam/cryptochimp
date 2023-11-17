import { TopCoinsTable } from "@/components/TopCoinsTable";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full animate-pulse rounded-lg bg-slate-200" />
      }
    >
      <TopCoinsTable />
    </Suspense>
  );
}
