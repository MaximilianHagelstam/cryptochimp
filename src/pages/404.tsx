import { useRouter } from "next/router";
import { Compass } from "react-feather";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <Compass size={96} className="mb-8" />
      <p className="mb-2 text-3xl font-bold">404</p>
      <p className="mb-8 text-2xl font-bold">Looks like you are lost</p>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="rounded-md bg-purple-200 px-4 py-2 hover:bg-purple-100"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
