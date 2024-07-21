"use client";

import { trade } from "@/actions";
import { formatCurrency } from "@/lib/utils";
import { TradeDetails } from "@/types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { TransactionType } from "@prisma/client";
import {
  Badge,
  Button,
  Callout,
  Dialog,
  DialogPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { useFormState } from "react-dom";

type TradeDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  details: TradeDetails;
  input: { symbol: string; quantity: number; type: TransactionType };
};

export const TradeDialog = ({
  isOpen,
  onClose,
  details,
  input,
}: TradeDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction] = useFormState(trade, {
    isError: false,
    message: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.set("symbol", input.symbol);
    formData.set("quantity", String(input.quantity));
    formData.set("type", input.type);
    formAction(formData);
    setIsLoading(false);
  };

  const canAfford = details.balanceAfter > 0;

  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel>
        <div className="flex flex-row gap-3">
          <Title>Confirm trade</Title>
          <Badge size="xs" color={input.type === "BUY" ? "blue" : "pink"}>
            {input.type}
          </Badge>
        </div>

        {state.isError && (
          <div className="mt-4 w-full">
            <Callout title="Invalid" icon={ExclamationTriangleIcon} color="red">
              {state.message}
            </Callout>
          </div>
        )}

        <p className="text-md mt-6 font-semibold">Transaction</p>
        <Table className="mt-2">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Coin</TableHeaderCell>
              <TableHeaderCell className="text-right">Quantity</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Price/Coin
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{input.symbol}</TableCell>
              <TableCell className="text-right">{input.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(details.pricePerCoin)}
              </TableCell>
            </TableRow>
            <TableRow className="text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">
                {formatCurrency(details.total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className="text-md mt-6 font-semibold">Balance</p>
        <Table className="mt-2">
          <TableBody>
            <TableRow>
              <TableCell>Current cash balance</TableCell>
              <TableCell className="text-right">
                {formatCurrency(details.balance)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash balance after trade</TableCell>
              <TableCell
                className={clsx(!canAfford && "text-red-500", "text-right")}
              >
                {formatCurrency(details.balanceAfter)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <form
          onSubmit={onSubmit}
          className="mt-6 flex w-full flex-row justify-end gap-3"
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!canAfford} loading={isLoading}>
            Confirm
          </Button>
        </form>
      </DialogPanel>
    </Dialog>
  );
};
