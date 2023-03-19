import { formatCurrency } from "@/utils/formatCurrency";
import { BadgeDelta, Card, Flex, Icon, Metric, Text } from "@tremor/react";
import type { ElementType } from "react";

type Color =
  | "blue"
  | "fuchsia"
  | "green"
  | "indigo"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "yellow"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "amber"
  | "lime"
  | "emerald"
  | "cyan"
  | "sky"
  | "violet"
  | "rose";

type IndicatorCardProps = {
  icon: ElementType;
  color: Color;
  title: string;
  metric: number;
  percentage?: string;
};

const IndicatorCard = ({
  icon,
  color,
  metric,
  title,
  percentage,
}: IndicatorCardProps) => {
  return (
    <Card>
      <Flex className="justify-start space-x-4">
        <Icon icon={icon} variant="light" size="xl" color={color} />
        <div className="truncate">
          <Flex className="items-start space-x-4">
            <Text>{title}</Text>
            {percentage && metric !== 0 && (
              <BadgeDelta
                deltaType={metric < 0 ? "decrease" : "increase"}
                size="xs"
              >
                {percentage}
              </BadgeDelta>
            )}
          </Flex>
          <Metric className="truncate">{formatCurrency(metric)}</Metric>
        </div>
      </Flex>
    </Card>
  );
};

export default IndicatorCard;
