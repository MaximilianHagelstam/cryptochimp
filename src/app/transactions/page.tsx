import { TransactionsTable } from "@/components/TransactionsTable";
import { getTransactions } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Transactions() {
  const userId = await getUserId();
  if (!userId) {
    redirect("/api/auth/signin");
  }
  const transactions = await getTransactions(userId);

  return <TransactionsTable transactions={transactions} />;
}
