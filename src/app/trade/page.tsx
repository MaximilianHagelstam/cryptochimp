"use client";

import { trade } from "@/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Bold,
  Button,
  Callout,
  Card,
  Divider,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button size="xl" type="submit" className="w-full" loading={pending}>
      Confirm trade
    </Button>
  );
};

export default function Trade() {
  const [state, formAction] = useFormState(trade, {
    isError: false,
    message: "",
  });

  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-xl">
        <form action={formAction} className="my-4 px-2 sm:px-16">
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            {state.isError && (
              <div className="w-full">
                <Callout
                  title="Error"
                  icon={ExclamationTriangleIcon}
                  color="red"
                >
                  {state.message}
                </Callout>
              </div>
            )}
            <div className="w-full">
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
            <div className="w-full">
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
            <div className="w-full">
              <Bold className="font-medium">Type</Bold>
              <Select
                id="type"
                name="type"
                defaultValue="BUY"
                enableClear={false}
                className="mt-2"
              >
                <SelectItem value="BUY">
                  <Badge size="xs" color="blue">
                    BUY
                  </Badge>
                </SelectItem>
                <SelectItem value="SELL">
                  <Badge size="xs" color="pink">
                    SELL
                  </Badge>
                </SelectItem>
              </Select>
            </div>
          </div>
          <Divider className="w-1/3" />
          <SubmitButton />
        </form>
      </Card>
    </div>
  );
}
