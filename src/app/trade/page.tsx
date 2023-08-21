"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Callout,
  Card,
  Flex,
  NumberInput,
  TextInput,
} from "@tremor/react";
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
              <TextInput
                className="mt-2"
                placeholder="ETH"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                required
                maxLength={5}
              />
            </div>
            <div className="w-full">
              <label className="font-medium">Quantity</label>
              <NumberInput
                className="mt-2"
                min={1}
                max={1_000_000_000}
                value={quantity}
                onValueChange={(value) =>
                  setQuantity(Number(value.toPrecision()))
                }
                required
              />
            </div>
          </div>
          <hr className="mx-auto my-8 h-px w-1/4 bg-slate-200" />
          <Flex className="justify-center space-x-4">
            <Button
              size="xl"
              variant="primary"
              className="px-14"
              loading={isLoading && type === "BUY"}
              onClick={() => setType("BUY")}
              type="submit"
            >
              Buy
            </Button>
            <Button
              size="xl"
              variant="secondary"
              className="px-14"
              loading={isLoading && type === "SELL"}
              onClick={() => setType("SELL")}
              type="submit"
            >
              Sell
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  );
}
