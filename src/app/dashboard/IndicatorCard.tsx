import { formatCurrency, formatPercentage, getDeltaType } from "@/lib/utils";
import { BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react";

type IndicatorCardProps = {
  title: string;
  value: number;
  percentage?: number;
};

export const IndicatorCard = ({
  title,
  value,
  percentage,
}: IndicatorCardProps) => {
  return (
    <Card>
      <Flex alignItems="start">
        <Text>{title}</Text>
        {percentage && (
          <BadgeDelta deltaType={getDeltaType(percentage)}>
            {formatPercentage(percentage)}
          </BadgeDelta>
        )}
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>{formatCurrency(value)}</Metric>
        {percentage && (
          <Text className="truncate">from {formatCurrency(10_000)}</Text>
        )}
      </Flex>
    </Card>
  );
};
