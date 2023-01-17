import { type NextPage } from "next";
import { useState } from "react";
import { Card, Flex } from "@tremor/react";
import { useTranslation } from "../hooks/useTranslation";
import TradeModal from "../components/TradeModal";

const Trade: NextPage = () => {
  const { t } = useTranslation();

  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"BUY" | "SELL">("BUY");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TradeModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        amount={amount}
        symbol={symbol}
        type={type}
      />

      <Card maxWidth="max-w-xl">
        <form
          className="my-4 px-16"
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <div className="w-full">
              <label className="font-medium">{t.common.coin}</label>
              <input
                type="text"
                className="mt-2 w-full rounded-md py-2 px-4 shadow ring-1 ring-slate-300 focus:outline-none"
                placeholder="BTC"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                required
                maxLength={5}
              />
            </div>
            <div className="w-full">
              <label className="font-medium">{t.common.amount}</label>
              <input
                type="number"
                className="mt-2 w-full rounded-md py-2 px-4 shadow ring-1 ring-slate-300 focus:outline-none"
                value={amount}
                min={1}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <hr className="my-8 mx-auto h-px w-1/4 bg-slate-200" />

          <Flex justifyContent="justify-between" spaceX="space-x-4">
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-lg font-medium text-white hover:bg-blue-700"
              onClick={() => setType("BUY")}
              type="submit"
            >
              {t.common.buy}
            </button>
            <button
              className="w-full rounded-md bg-pink-600 px-4 py-2 text-lg font-medium text-white hover:bg-pink-700"
              onClick={() => setType("SELL")}
              type="submit"
            >
              {t.common.sell}
            </button>
          </Flex>
        </form>
      </Card>
    </>
  );
};

export default Trade;
