"use client";

import { TradeDetails } from "@/types";
import { TransactionType } from "@prisma/client";
import { Button, Dialog, DialogPanel } from "@tremor/react";

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
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Confirm trade
        </h3>
        <pre className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          {JSON.stringify({ details, input }, null, 2)}
        </pre>
        <Button className="mt-8 w-full" onClick={onClose}>
          Confirm
        </Button>
      </DialogPanel>
    </Dialog>
  );
};
