import { getTransactions } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { getOwnedCoins } from "@/lib/crypto";
import { Card, Title } from "@tremor/react";
import { PortfolioBreakdownChart } from "./PortfolioBreakdownChart";

export const PortfolioBreakdown = async () => {
  const userId = await getUserId();
  const transactions = await getTransactions(userId);
  const ownedCoins = await getOwnedCoins(transactions);

  if (ownedCoins.length === 0)
    return (
      <Card className="h-full">
        <div className="flex h-full flex-col items-center justify-center">
          <Title color="slate">Portfolio is empty</Title>
        </div>
      </Card>
    );

  return (
    <Card className="h-full">
      <Title>Portfolio breakdown</Title>
      <PortfolioBreakdownChart coins={ownedCoins} />
    </Card>
  );
};
