import { getIndicatorData } from "@/lib/api";
import { getUserId } from "@/lib/auth";
import { formatCurrency, getDeltaType } from "@/lib/utils";
import { BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react";

export const IndicatorCardRow = async () => {
  const userId = await getUserId();
  const { development, balance, capital } = await getIndicatorData(userId);

  return (
    <>
      <Card>
        <Flex alignItems="start">
          <Text>Development</Text>
          <BadgeDelta deltaType={getDeltaType(development.value)}>
            {development.percentage}
          </BadgeDelta>
        </Flex>
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-3 truncate"
        >
          <Metric>{formatCurrency(development.value)}</Metric>
        </Flex>
      </Card>
      <Card>
        <Text>Capital</Text>
        <Metric>{formatCurrency(capital)}</Metric>
      </Card>
      <Card>
        <Text>Balance</Text>
        <Metric>{formatCurrency(balance)}</Metric>
      </Card>
    </>
  );
};
