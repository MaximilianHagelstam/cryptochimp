import { authOptions } from "@/lib/auth";
import { getPrice } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();
  const symbol = body.symbol.trim().toUpperCase() as string;
  const { type, quantity } = body as {
    type: "BUY" | "SELL";
    quantity: number;
  };

  if (!type || !symbol || !quantity)
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );

  if (quantity <= 0)
    return NextResponse.json(
      { message: "Quantity must be greater than 0" },
      { status: 400 }
    );

  try {
    const pricePerCoin = await getPrice(symbol);
    const total = quantity * pricePerCoin;

    if (type === "BUY") {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      if (user.balance < total)
        return NextResponse.json(
          { message: "Cannot afford purchase" },
          { status: 400 }
        );

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: {
            decrement: total,
          },
        },
      });
    }

    if (type === "SELL") {
      const transactionsForCoin = await prisma.transaction.findMany({
        where: {
          userId,
          symbol,
        },
        select: {
          quantity: true,
          type: true,
        },
      });

      const totalCoinsOwned = transactionsForCoin.reduce(
        (total, transaction) => {
          if (transaction.type === "BUY") {
            return total + transaction.quantity;
          }
          return total - transaction.quantity;
        },
        0
      );

      if (totalCoinsOwned < quantity)
        return NextResponse.json(
          { message: "Not enough coins to sell" },
          { status: 400 }
        );

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: {
            increment: total,
          },
        },
      });
    }

    await prisma.transaction.create({
      data: {
        type,
        quantity,
        symbol,
        pricePerCoin,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Transaction created" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
