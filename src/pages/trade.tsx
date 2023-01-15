import { Button } from "@tremor/react";
import { type NextPage } from "next";
import { useTranslation } from "../hooks/useTranslation";
import { trpc } from "../utils/trpc";

const Trade: NextPage = () => {
  const ctx = trpc.useContext();
  const { t } = useTranslation();

  const { mutate } = trpc.transaction.create.useMutation({
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
      <Button size="xl" text={t.common.buy} color="blue" onClick={handleBuy} />
      <Button
        size="xl"
        text={t.common.sell}
        color="pink"
        marginTop="mt-2"
        onClick={handleSell}
      />
    </>
  );
};

export default Trade;
