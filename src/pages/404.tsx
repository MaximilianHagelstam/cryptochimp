import type { NextPage } from "next";
import { useRouter } from "next/router";

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">Page not found</p>
      <p className="mb-8 text-lg">
        The page you are looking for does not exist.
      </p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={() => {
          router.push("/");
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
