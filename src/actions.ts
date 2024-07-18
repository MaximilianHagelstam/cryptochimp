"use server";

import { createTransaction, getTradeDetails } from "@/lib/api";
import { TradeDetails } from "@/types";
import { TransactionType } from "@prisma/client";
import { redirect } from "next/navigation";

export const trade = async (
  _prevState: unknown,
  formData: FormData
): Promise<{
  isError: boolean;
  message: string;
}> => {
  let isError = false;

  try {
    const symbol =
      formData.get("symbol")?.toString().trim().toLocaleUpperCase() ?? "";
    const quantity = Number(formData.get("quantity"));
    const type = formData.get("type")?.toString() as TransactionType;

    await createTransaction(symbol, quantity, type);
    return { isError, message: "" };
  } catch (error) {
    isError = true;
    return { isError, message: error instanceof Error ? error.message : "" };
  } finally {
    if (!isError) {
      redirect("/transactions");
    }
  }
};

export const fetchTradeDetails = async (
  _prevState: unknown,
  formData: FormData
): Promise<{
  isError: boolean;
  data: TradeDetails | null;
  input: {
    symbol: string;
    quantity: number;
    type: TransactionType;
  };
}> => {
  const symbol =
    formData.get("symbol")?.toString().trim().toLocaleUpperCase() ?? "";
  const quantity = Number(formData.get("quantity"));
  const type = formData.get("type")?.toString() as TransactionType;
  const input = { symbol, quantity, type };

  try {
    const data = await getTradeDetails(symbol, quantity, type);
    return { isError: false, data, input };
  } catch (error) {
    return { isError: true, data: null, input };
  }
};
