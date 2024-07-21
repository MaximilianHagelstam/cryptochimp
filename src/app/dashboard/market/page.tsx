import { Skeleton } from "@/components/Skeleton";
import { Suspense } from "react";
import { TopCoinsTable } from "./TopCoinsTable";

export default async function Market() {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-full" />}>
      <TopCoinsTable />
    </Suspense>
  );
}
