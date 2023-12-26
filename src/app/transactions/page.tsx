import { Skeleton } from "@/components/Skeleton";
import { Suspense } from "react";
import { TransactionsTable } from "./TransactionsTable";

export default function Transactions() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <TransactionsTable />
    </Suspense>
  );
}
