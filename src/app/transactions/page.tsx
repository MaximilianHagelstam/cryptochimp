import { getTransactions } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { TransactionsTable } from "./TransactionsTable";

export default async function Transactions() {
  const userId = await getUserId();
  const transactions = await getTransactions(userId);

  return <TransactionsTable transactions={transactions} />;
}
