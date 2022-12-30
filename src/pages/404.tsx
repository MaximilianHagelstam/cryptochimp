import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">Page not found</p>
      <p className="mb-8 text-lg">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
