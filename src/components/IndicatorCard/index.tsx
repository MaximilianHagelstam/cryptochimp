import type { ElementType } from "react";
import { Card, Metric, Text, Icon, Flex, Block } from "@tremor/react";

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

interface IndicatorCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ElementType<any>;
  color: Color;
  title: string;
  metric: string;
}

const IndicatorCard = ({ icon, color, metric, title }: IndicatorCardProps) => {
  return (
    <Card decoration="top" decorationColor={color}>
      <Flex justifyContent="justify-start" spaceX="space-x-4">
        <Icon icon={icon} variant="light" size="xl" color={color} />
        <Block truncate={true}>
          <Text>{title}</Text>
          <Metric truncate={true}>{metric}</Metric>
        </Block>
      </Flex>
    </Card>
  );
};

export default IndicatorCard;
