import { TransactionsTable } from "@/components/TransactionsTable";
import { getTransactions } from "@/lib/api";
import { getUserId } from "@/lib/auth";

export default async function Transactions() {
  const userId = await getUserId();
  const transactions = await getTransactions(userId);

  return <TransactionsTable transactions={transactions} />;
}
