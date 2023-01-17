import { Card, Metric, Text, Icon, Flex, Block } from "@tremor/react";
import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "../../hooks/useTranslation";
import { formatPrice } from "../../utils/formatters";

interface BalanceCardProps {
  cash: number;
  isLoading: boolean;
}

const BalanceCard = ({ cash, isLoading }: BalanceCardProps) => {
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
    );

  return (
    <Card decoration="top" decorationColor="emerald">
      <Flex justifyContent="justify-start" spaceX="space-x-4">
        <Icon
          icon={CurrencyEuroIcon}
          variant="light"
          size="xl"
          color="emerald"
        />
        <Block truncate={true}>
          <Text>{t.dashboard.balance}</Text>
          <Metric truncate={true}>{formatPrice(cash)}</Metric>
        </Block>
      </Flex>
    </Card>
  );
};

export default BalanceCard;
