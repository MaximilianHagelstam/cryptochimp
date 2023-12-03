"use client";

import { trade } from "@/app/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Bold,
  Button,
  Callout,
  Card,
  Divider,
  Flex,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size="xl"
      variant="primary"
      className="px-14"
      type="submit"
      loading={pending}
    >
      Confirm trade
    </Button>
  );
}

export default function Trade() {
  const [state, formAction] = useFormState(trade, {
    error: false,
    message: "",
  });

  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-xl">
        <form action={formAction} className="my-4 px-2 sm:px-16">
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            {state.error && (
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
                // @ts-expect-error name prop in needed for server action
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
          <Divider className="w-1/4" />
          <Flex className="justify-center space-x-4">
            <SubmitButton />
          </Flex>
        </form>
      </Card>
    </div>
  );
}
