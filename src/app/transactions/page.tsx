import { getTransactions } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TransactionsTable } from "./TransactionsTable";

export default async function Transactions() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/signin");
  }

  const transactions = await getTransactions(user.id);

  return <TransactionsTable transactions={transactions} />;
}
