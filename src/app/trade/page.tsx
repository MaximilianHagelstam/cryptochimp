"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Callout, Card, Flex } from "@tremor/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Trade() {
  const router = useRouter();

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [type, setType] = useState<"BUY" | "SELL">("BUY");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch("/api/trade", {
      method: "POST",
      body: JSON.stringify({ quantity, symbol, type }),
    });
    setIsLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { message: string };
      setIsError(true);
      setError(data.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-xl">
        <form className="my-4 px-2 sm:px-16" onSubmit={(e) => onSubmit(e)}>
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            {isError && (
              <div className="w-full">
                <Callout
                  title="Error"
                  icon={ExclamationTriangleIcon}
                  color="red"
                >
                  {error}
                </Callout>
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
          <Flex className="justify-between space-x-4">
            <button
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-lg font-medium text-white hover:bg-blue-700"
              onClick={() => setType("BUY")}
              type="submit"
            >
              Buy
            </button>
            <button
              disabled={isLoading}
              className="w-full rounded-md bg-pink-600 px-4 py-2 text-lg font-medium text-white hover:bg-pink-700"
              onClick={() => setType("SELL")}
              type="submit"
            >
              Sell
            </button>
          </Flex>
        </form>
      </Card>
    </div>
  );
}
