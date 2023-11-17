"use client";

import { formatCurrency } from "@/lib/utils";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { BadgeDelta, Card, Flex, Icon, Metric, Text } from "@tremor/react";

interface IndicatorCardProps {
  title: string;
  metric: number;
  percentage?: string;
}

export const IndicatorCard = ({
  metric,
  title,
  percentage,
}: IndicatorCardProps) => {
  return (
    <Card>
      <Flex className="justify-start space-x-4">
        <Icon
          icon={
            title === "Development"
              ? ArrowTrendingUpIcon
              : title === "Capital"
                ? BuildingLibraryIcon
                : BanknotesIcon
          }
          variant="light"
          size="xl"
          color="blue"
        />
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
