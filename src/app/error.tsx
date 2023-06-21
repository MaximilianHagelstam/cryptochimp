"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">Oops</p>
      <p className="mb-8 text-lg">{error.name}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
