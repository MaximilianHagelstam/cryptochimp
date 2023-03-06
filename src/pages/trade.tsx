import { type NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Callout, Card, Flex } from "@tremor/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import TradeModal from "@/components/TradeModal";
import { api } from "@/utils/api";
import Layout from "@/components/Layout";

const Trade: NextPage = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    signIn();
  }

  const router = useRouter();
  const ctx = api.useContext();

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [type, setType] = useState<"BUY" | "SELL">("BUY");
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isError, error, isLoading } =
    api.transaction.create.useMutation({
      onSuccess: () => {
        ctx.invalidate();
        setIsOpen(false);
        router.push("/");
      },
      onError: () => {
        setIsOpen(false);
      },
    });

  return (
    <Layout title="Trade">
      <TradeModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        quantity={quantity}
        symbol={symbol}
        type={type}
        confirmIsDisabled={isLoading}
        onConfirm={() =>
          mutate({
            quantity,
            symbol,
            type,
          })
        }
      />

      <Card maxWidth="max-w-xl">
        <form
          className="my-4 px-2 sm:px-16"
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            {isError && (
              <div className="w-full">
                <Callout
                  title="Error"
                  text={error.message}
                  icon={ExclamationTriangleIcon}
                  color="red"
                />
              </div>
            )}

            <div className="w-full">
              <label className="font-medium">Coin</label>
              <input
                type="text"
                className="mt-2 w-full rounded-md py-2 px-4 shadow ring-1 ring-slate-300 focus:outline-none"
                placeholder="ETH"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                required
                maxLength={5}
              />
            </div>
            <div className="w-full">
              <label className="font-medium">Quantity</label>
              <input
                type="number"
                className="mt-2 w-full rounded-md py-2 px-4 shadow ring-1 ring-slate-300 focus:outline-none"
                value={quantity}
                min={1}
                max={1_000_000_000}
                onChange={(e) => setQuantity(Number(e.target.value))}
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
              Buy
            </button>
            <button
              className="w-full rounded-md bg-pink-600 px-4 py-2 text-lg font-medium text-white hover:bg-pink-700"
              onClick={() => setType("SELL")}
              type="submit"
            >
              Sell
            </button>
          </Flex>
        </form>
      </Card>
    </Layout>
  );
};

export default Trade;
