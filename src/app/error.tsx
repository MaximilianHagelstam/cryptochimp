"use client";

import { Button } from "@tremor/react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">Oops</p>
      <p className="mb-8 text-lg">An error occurred. Please try again later.</p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
