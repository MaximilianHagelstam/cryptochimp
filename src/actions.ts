"use server";

import { createTransaction, getTradeDetails } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { TradeDetails } from "@/types";
import { TransactionType } from "@prisma/client";
import { redirect } from "next/navigation";

const parseTradeFormData = (formData: FormData) => {
  const symbol =
    formData.get("symbol")?.toString().trim().toLocaleUpperCase() ?? "";
  const quantity = Number(formData.get("quantity"));
  const type = formData.get("type")?.toString() as TransactionType;

  return { symbol, quantity, type };
};

export const trade = async (
  _prevState: unknown,
  formData: FormData
): Promise<{
  isError: boolean;
  message: string;
}> => {
  const user = await getCurrentUser();
  if (!user) {
    return { isError: true, message: "Not authenticated" };
  }

  let isError = false;
  try {
    const { symbol, quantity, type } = parseTradeFormData(formData);
    await createTransaction(user.id, symbol, quantity, type);
    return { isError, message: "" };
  } catch (error) {
    isError = true;
    return { isError, message: error instanceof Error ? error.message : "" };
  } finally {
    if (!isError) {
      redirect("/dashboard/transactions");
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
  const input = parseTradeFormData(formData);

  const user = await getCurrentUser();
  if (!user) {
    return { isError: true, data: null, input };
  }

  try {
    const data = await getTradeDetails(
      user.id,
      input.symbol,
      input.quantity,
      input.type
    );
    return { isError: false, data, input };
  } catch (error) {
    return { isError: true, data: null, input };
  }
};
