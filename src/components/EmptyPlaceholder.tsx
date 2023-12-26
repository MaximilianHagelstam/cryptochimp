import { Card, Title } from "@tremor/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const EmptyPlaceholder = ({ className }: { className?: string }) => {
  return (
    <Card
      className={twMerge(
        "flex flex-col items-center justify-center",
        className
      )}
    >
      <Title>No transactions</Title>
      <p className="mt-2">
        Invest in your first coin{" "}
        <Link className="text-blue-600 hover:underline" href="/trade">
          here
        </Link>
      </p>
    </Card>
  );
};
