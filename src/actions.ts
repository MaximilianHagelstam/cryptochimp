"use server";

import { createTransaction } from "@/lib/api";
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
