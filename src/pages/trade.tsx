import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Card, Flex } from "@tremor/react";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { trpc } from "../utils/trpc";

const Trade: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const ctx = trpc.useContext();

  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"BUY" | "SELL">("BUY");

  const { mutate } = trpc.transaction.create.useMutation({
    onSuccess: () => ctx.invalidate(),
  });

  return (
    <Card maxWidth="max-w-xl">
      <form
        className="mx-16 my-4 flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            amount,
            symbol,
            type,
          });
          router.push("/transactions");
        }}
      >
        <div>
          <label className="font-medium">Coin symbol</label>
          <input
            type="text"
            className="mt-2 w-full rounded-md py-2 px-4 shadow ring-1 ring-slate-300 focus:outline-none"
            placeholder="BTC"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            required
          />
        </div>

        <div>
          <label className="font-medium">Amount</label>
          <input
            type="number"
            className="mb-2 mt-2 w-full rounded-md py-2 px-4 shadow ring-1 ring-slate-300 focus:outline-none"
            value={amount}
            min={1}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <Flex justifyContent="justify-center" spaceX="space-x-2">
          <Button
            text={t.common.sell}
            color="pink"
            type="submit"
            size="md"
            onClick={() => setType("SELL")}
          />
          <Button
            text={t.common.buy}
            type="submit"
            size="md"
            onClick={() => setType("BUY")}
          />
        </Flex>
      </form>
    </Card>
  );
};

export default Trade;
