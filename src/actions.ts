"use server";

import { createTransaction } from "@/lib/api";
import { redirect } from "next/navigation";

export const trade = async (_prevState: unknown, formData: FormData) => {
  let isError = false;
  try {
    const symbol =
      formData.get("symbol")?.toString().trim().toLocaleUpperCase() ?? "";
    const quantity = Number(formData.get("quantity"));
    const type = formData.get("type")?.toString() as "BUY" | "SELL";

    await createTransaction(symbol, quantity, type);
    return { error: false, message: "" };
  } catch (e) {
    isError = true;
    const err = e as { message: string };
    return { error: true, message: err.message };
  } finally {
    if (!isError) {
      redirect("/transactions");
    }
  }
};
