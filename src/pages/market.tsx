import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Market: NextPage = () => {
  const { data } = trpc.market.getMarketData.useQuery();

  return <div>{`Hello ${data?.name}`}</div>;
};

export default Market;
