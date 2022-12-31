import { type NextPage } from "next";
import { trpc } from "../utils/trpc";

const Transactions: NextPage = () => {
  const ctx = trpc.useContext();

  const { data: transactions } = trpc.transaction.getAll.useQuery();
  const { mutate } = trpc.transaction.create.useMutation({
    onSuccess: () => ctx.invalidate(),
  });

  return (
    <>
      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {transaction.type} {transaction.amount} {transaction.symbol}
        </p>
      ))}
      <button
        onClick={() =>
          mutate({
            type: "BUY",
            amount: 2,
            symbol: "BTC",
            pricePerCoin: 100,
          })
        }
      >
        Buy 2 Bitcoins
      </button>
    </>
  );
};

export default Transactions;
