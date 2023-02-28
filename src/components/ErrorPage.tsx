import { signOut } from "next-auth/react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">Oops</p>
      <p className="mb-8 text-lg">Something went wrong.</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ErrorPage;
