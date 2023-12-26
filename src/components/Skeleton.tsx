import clsx from "clsx";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx("flex animate-pulse rounded-lg bg-slate-200", className)}
    />
  );
};
