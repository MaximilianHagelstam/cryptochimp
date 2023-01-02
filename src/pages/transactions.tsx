import { type NextPage } from "next";
import { formatDate } from "../utils/formatDate";
import { trpc } from "../utils/trpc";

const Transactions: NextPage = () => {
  const ctx = trpc.useContext();

  const { data: transactions } = trpc.transaction.getAll.useQuery();
  const { mutate, isLoading } = trpc.transaction.create.useMutation({
    onSuccess: () => ctx.invalidate(),
  });

  const handleBuy = () => {
    mutate({
      type: "BUY",
      amount: 1,
      symbol: "BTC",
    });
  };

  const handleSell = () => {
    mutate({
      type: "SELL",
      amount: 1,
      symbol: "BTC",
    });
  };

  return (
    <>
      {transactions?.length === 0 && <p>No transactions yet</p>}
      {isLoading && <p>Loading...</p>}

      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {formatDate(transaction.createdAt)} ~ {transaction.type}{" "}
          {transaction.amount} {transaction.symbol} for{" "}
          {Math.floor(transaction.pricePerCoin)}€
        </p>
      ))}

      <div>
        <button
          className="mr-2 bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          onClick={handleBuy}
        >
          Buy 1 Bitcoin
        </button>
        <button
          className="bg-red-400 px-4 py-2 font-medium text-white hover:bg-rose-500"
          onClick={handleSell}
        >
          Sell 1 Bitcoin
        </button>
      </div>
    </>
  );
};

export default Transactions;
