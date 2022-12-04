import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data: examples } = trpc.example.getAll.useQuery();
  const { data } = trpc.example.hello.useQuery({ text: "team" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Hello <span className="text-[hsl(280,100%,70%)]">Team</span>
      </h1>

      {examples?.map((example) => (
        <p className="text-xl text-white" key={example.id}>
          {example.id}
        </p>
      ))}
      <p className="text-2xl text-white">{data?.greeting}</p>

      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Welcome {sessionData.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </main>
  );
};

export default Home;
