import { twMerge } from "tailwind-merge";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex animate-pulse rounded-lg bg-slate-200",
        className
      )}
    />
  );
};
