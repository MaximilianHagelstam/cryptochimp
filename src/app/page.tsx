import { Skeleton } from "@/components/Skeleton";
import { Suspense } from "react";
import { TopCoinsTable } from "./TopCoinsTable";

export default function Home() {
  return (
    <Suspense fallback={<Skeleton className="h-[786px] w-full" />}>
      <TopCoinsTable />
    </Suspense>
  );
}
