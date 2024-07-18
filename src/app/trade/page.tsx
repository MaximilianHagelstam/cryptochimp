"use client";

import { fetchTradeDetails } from "@/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  Bold,
  Button,
  Callout,
  Card,
  Divider,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { TradeDialog } from "./TradeDialog";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button size="xl" type="submit" loading={pending}>
      Submit trade
    </Button>
  );
};

export default function Trade() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, formAction] = useFormState(fetchTradeDetails, {
    data: null,
    isError: false,
    input: {
      quantity: 0,
      symbol: "",
      type: "BUY",
    },
  });

  useEffect(() => {
    setIsDialogOpen((prev) => !prev);
  }, [state.input.quantity, state.input.symbol, state.input.type]);

  return (
    <>
      <Card className="flex w-full justify-center py-12">
        <div className="flex w-full max-w-xl flex-col justify-center gap-6">
          <Title>Trade</Title>
          {state.isError && (
            <div className="w-full">
              <Callout
                title="Invalid symbol"
                icon={ExclamationTriangleIcon}
                color="red"
              >
                Coin symbol not found. Check that the symbol is spelled
                correctly.
              </Callout>
            </div>
          )}
          <form action={formAction} className="flex flex-col gap-3">
            <div>
              <Bold className="font-medium">Coin</Bold>
              <TextInput
                className="mt-2"
                placeholder="ETH"
                required
                maxLength={5}
                id="symbol"
                name="symbol"
              />
            </div>
            <div>
              <Bold className="font-medium">Quantity</Bold>
              <NumberInput
                className="mt-2"
                min={1}
                max={1_000_000_000}
                required
                id="quantity"
                name="quantity"
              />
            </div>
            <div>
              <Bold className="font-medium">Type</Bold>
              <Select
                id="type"
                name="type"
                defaultValue="BUY"
                enableClear={false}
                className="mt-2"
              >
                <SelectItem value="BUY" color="blue">
                  BUY
                </SelectItem>
                <SelectItem value="SELL" color="pink">
                  SELL
                </SelectItem>
              </Select>
            </div>
            <Divider className="w-1/3" />
            <SubmitButton />
          </form>
        </div>
      </Card>
      {state.data ? (
        <TradeDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          details={state.data}
          input={state.input}
        />
      ) : null}
    </>
  );
}
