import { Suspense } from "react";
import { TransactionsTable } from "./TransactionsTable";

export default function Transactions() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
      }
    >
      <TransactionsTable />
    </Suspense>
  );
}
