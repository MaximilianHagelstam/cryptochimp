import { TopCoinsTable } from "@/components/TopCoinsTable";
import { getTopCoins } from "@/lib/api";

export default async function Home() {
  const topCoins = await getTopCoins(50);

  return <TopCoinsTable coins={topCoins} />;
}
